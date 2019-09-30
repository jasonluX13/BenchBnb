using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirBench.Models
{
    public class Review
    {
        public Review()
        {

        }

        public int Id { get; set; }
        public double Rating { get; set; }
        public string Feedback { get; set; }
        public DateTimeOffset SubmitedOn{ get; set;}

        public int UserId { get; set; }
        public User User { get; set; }

        public int BenchId { get; set; }
        public Bench Bench { get; set; }
    }
}