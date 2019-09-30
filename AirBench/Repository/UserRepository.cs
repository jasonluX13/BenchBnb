using AirBench.Data;
using AirBench.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirBench.Repository
{
    public class UserRepository
    {
        private Context context; 

        public UserRepository(Context context)
        {
            this.context = context;
        }

        public List<User> GetAll()
        {
            return context.Users.ToList();
        }
    }
}