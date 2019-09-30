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

            ViewBag.Title = "Air Bench";
            BenchRepository repo = new BenchRepository(context);
            List<Bench> users = repo.GetAll();
            return View(users);
        }
    }
}
