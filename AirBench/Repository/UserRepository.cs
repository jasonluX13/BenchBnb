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

        public User GetById(int id)
        {
            return context.Users
                .Where(u => u.Id == id)
                .SingleOrDefault();
        }

        public User GetByEmail(string email)
        {
            return context.Users
                .Where(u => u.Email == email)
                .SingleOrDefault();
        }

        public void Insert(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
        }

    }
}