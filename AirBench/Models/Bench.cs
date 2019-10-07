using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        public Bench(string description, int numSeats, double lat, double lon)
        {
            Description = description;
            NumSeats = numSeats;
            Latitude = lat;
            Longitude = lon;
        }
        public int Id { get; set; }
        [Required]
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
                _rating = Math.Round((double)_rating, 1);
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