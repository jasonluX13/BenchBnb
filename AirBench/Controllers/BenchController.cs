﻿using AirBench.Data;
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
    public class BenchController : Controller
    {
        private Context context;

        public BenchController()
        {
            context = new Context();
        }
        // GET: Bench
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public ActionResult Add()
        {
            CreateBench viewModel = new CreateBench();
            return View(viewModel);
        }

        [HttpPost]
        public ActionResult Add(CreateBench viewModel)
        {
            try
            {
                Bench bench = new Bench()
                {
                    Description = viewModel.Description,
                    NumSeats = viewModel.NumSeats,
                    Latitude = viewModel.Latitude,
                    Longitude = viewModel.Longitude,
                    UserId = 1
                };
                BenchRepository repo = new BenchRepository(context);
                repo.AddBench(bench);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return View(viewModel);
            }
            
        }
    }
}