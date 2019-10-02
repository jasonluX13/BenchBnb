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

            Review rev1 = new Review()
            {
                Rating = 4,
                Feedback = "Not bad, would sit again.",
                SubmitedOn = DateTime.Now.AddDays(-2),
                User = jason,
                Bench = old
            };
            context.Reviews.Add(rev1);

            context.SaveChanges();
        }
    }
}