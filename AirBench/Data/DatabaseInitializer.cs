using AirBench.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AirBench.Data
{
    public class DatabaseInitializer : DropCreateDatabaseAlways<Context>
    {
        protected override void Seed(Context context)
        {
            User jason = new User()
            {
                FirstName= "Jason",
                LastName ="Lu",
                Email = "jlu@gmail.com",
                HashedPassword = "$2a$12$.Pi4p8i14tFPafiLTHy...idhMN.9NEIKr8y7mM4TpgFYStIEGNae"
            };

            context.Users.Add(jason);


            Bench old = new Bench()
            {
                Description = "An old bench",
                User = jason,
                NumSeats = 4,
                Latitude = 40.757352,
                Longitude = -73.923220
            };
           
            Bench park = new Bench()
            {
                Description = "A park bench",
                User = jason,
                NumSeats = 6,
                Latitude = 40.755262,
                Longitude = -73.925210
            };
            context.Benches.Add(old);
            context.Benches.Add(park);
            for (int i = 0; i < 110; i++)
            {
                Random rand = new Random();
                int latOffset = rand.Next(i) - rand.Next(i);
                int lonOffset = rand.Next(i) - rand.Next(i);
                Bench newBench = new Bench()
                {
                    Description = $"Bench #{i}",
                    User = jason,
                    NumSeats = i%9,
                    Latitude = 40.755262 + latOffset * 0.001,
                    Longitude = -73.925210 - lonOffset * 0.001
                };
                context.Benches.Add(newBench);
            }
            Review rev1 = new Review()
            {
                Rating = 4,
                Feedback = "Not bad, would sit again.",
                SubmitedOn = DateTime.Now.AddDays(-2),
                User = jason,
                Bench = old
            };
            Review rev2 = new Review()
            {
                Rating = 2,
                Feedback = "Not bad, would sit again.",
                SubmitedOn = DateTime.Now.AddDays(-2),
                User = jason,
                Bench = park
            };
            Review rev3 = new Review()
            {
                Rating = 3,
                Feedback = "Not bad, would sit again.",
                SubmitedOn = DateTime.Now.AddDays(-2),
                User = jason,
                Bench = park
            };
            Review rev4 = new Review()
            {
                Rating = 3,
                Feedback = "Not bad, would sit again.",
                SubmitedOn = DateTime.Now.AddDays(-2),
                User = jason,
                Bench = park
            };
            context.Reviews.Add(rev1);
            context.Reviews.Add(rev2);
            context.Reviews.Add(rev3);
            context.Reviews.Add(rev4);

            context.SaveChanges();
        }
    }
}