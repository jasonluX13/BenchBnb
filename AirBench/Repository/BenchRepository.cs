using AirBench.Data;
using AirBench.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
            return context.Benches.ToList();
        }
    }
}