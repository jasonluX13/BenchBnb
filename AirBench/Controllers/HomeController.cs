using AirBench.Data;
using AirBench.Models;
using AirBench.Repository;
using System.Collections.Generic;
using System.Web.Mvc;

namespace AirBench.Controllers
{
    public class HomeController : Controller
    {
        private Context context;
        public HomeController()
        {
            context = new Context();
        }
        public ActionResult Index()
        {
            if (Request.IsAuthenticated)
            {
                User current = new UserRepository(context).GetByEmail(User.Identity.Name);
                ViewBag.Name = current.FirstName + ' ' + current.LastName;
            }
 
            ViewBag.Title = "Air Bench";
            BenchRepository repo = new BenchRepository(context);
            List<Bench> users = repo.GetAll();
            return View(users);
        }
    }
}
