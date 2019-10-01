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
                HashedPassword = ""
            };

            context.Users.Add(jason);


            Bench old = new Bench()
            {
                Description = "An old bench",
                User = jason,
                NumSeats = 4
            };
            Bench park = new Bench()
            {
                Description = "A park bench",
                User = jason,
                NumSeats = 6
            };
            context.Benches.Add(old);
            context.Benches.Add(park);
            context.SaveChanges();
        }
    }
}