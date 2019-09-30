using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirBench.Models
{
    public class Bench
    {
        public Bench()
        {
            Reviews = new List<Review>();
        }

        public int Id { get; set; }
        public string Description { get; set; }
        public int NumSeats { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public void SetRating()
        {
            if (Reviews.Count == 0)
            {
                _rating = null;
            }
            else
            {
                _rating = Reviews.Average(r => r.Rating);
            }
            
        }
        public double? GetRating()
        {
            return _rating;
        }
        private double? _rating { get; set; }
         
        public int UserId { get; set; }
        public User User { get; set; }

        public List<Review> Reviews { get; set; }
    }
}