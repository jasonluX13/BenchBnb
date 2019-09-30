using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirBench.Models
{
    public class User
    {
        public User()
        {

        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }

        
    }
}