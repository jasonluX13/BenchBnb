using AirBench.Data;
using AirBench.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace AirBench.Repository
{
    public class BenchRepository
    {
        private Context context;

        public BenchRepository(Context context)
        {
            this.context = context;
        }

        public List<Bench> GetAll()
        {
            List<Bench> benches =  context.Benches
                .Include(b => b.User)
                .Include(b => b.Reviews)
                .ToList();
            foreach (Bench bench in benches)
            {
                bench.SetRating();
            }
            return benches;
        }
    }
}