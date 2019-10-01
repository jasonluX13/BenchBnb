using AirBench.Data;
using AirBench.Models;
using AirBench.Repository;
using AirBench.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirBench.Controllers
{
    [Authorize]
    public class ReviewController : Controller
    {
        private Context context;

        public ReviewController()
        {
            this.context = new Context();
        }
        // GET: Review
        public ActionResult Add(int? id)
        {   
            if (id == null)
            {
                return RedirectToAction("Index", "Home");
            }
            CreateReview viewModel = new CreateReview();
            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Add(int? id, CreateReview viewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return View(viewModel);
                }
                ReviewRepository repo = new ReviewRepository(context);
                User current = new UserRepository(context).GetByEmail(User.Identity.Name);
                int userId = current.Id;
                Review review = new Review()
                {
                    Rating = viewModel.Rating,
                    Feedback = viewModel.Feedback,
                    SubmitedOn = DateTimeOffset.Now,
                    BenchId = (int)id,
                    UserId =userId
                };
                repo.Insert(review);
                return RedirectToAction("Details", "Bench", new { id = id });
            }
            catch (Exception ex)
            {
                return View(viewModel);
            }
            
        }
    }
}