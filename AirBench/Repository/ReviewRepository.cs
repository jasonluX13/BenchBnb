using AirBench.Data;
using AirBench.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirBench.Repository
{
    public class ReviewRepository
    {
        private Context context;

        public ReviewRepository(Context context)
        {
            this.context = context;
        }

        public void Insert(Review review)
        {
            context.Reviews.Add(review);
            context.SaveChanges();
        }
    }
}