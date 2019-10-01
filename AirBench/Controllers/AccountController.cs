using AirBench.Data;
using AirBench.Models;
using AirBench.Repository;
using AirBench.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BCrypt.Net;
using System.Web.Security;

namespace AirBench.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private Context context;

        public AccountController()
        {
            context = new Context();
        }
        // GET: Account
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login(LoginUser viewModel)
        {
            UserRepository repo = new UserRepository(context);
            User current = repo.GetByEmail(viewModel.Email);
            if (current == null)
            {
                return View(viewModel);
            }
            if (BCrypt.Net.BCrypt.Verify(viewModel.Password, current.HashedPassword))
            {
                FormsAuthentication.SetAuthCookie(viewModel.Email, false);
                return RedirectToAction("Index", "Home");
            }
            return View(viewModel);
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Register(RegisterUser viewModel)
        {
            UserRepository repo = new UserRepository(context);
            if (repo.GetByEmail(viewModel.Email) != null){
                ModelState.AddModelError("","This email already exists");
                return View(viewModel);
            }

            User user = new User()
            {
                FirstName = viewModel.FirstName,
                LastName = viewModel.LastName,
                Email = viewModel.Email,
                HashedPassword = BCrypt.Net.BCrypt.HashPassword(viewModel.Password)
            };
            repo.Insert(user);
            FormsAuthentication.SetAuthCookie(viewModel.Email, false);
            return RedirectToAction("Index", "Home");
        }
    }
}