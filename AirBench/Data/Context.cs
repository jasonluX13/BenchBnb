using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using AirBench.Models;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace AirBench.Data
{
    public class Context : DbContext 
    {
        public Context () : base("name=AirBench") {
            Database.SetInitializer<Context>(new DatabaseInitializer());
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Bench> Benches { get; set; }
        public DbSet<Review> Reviews { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Entity<Review>()
                .HasRequired(r => r.Bench)
                .WithMany(b => b.Reviews)
                .WillCascadeOnDelete(false);
            modelBuilder.Entity<Bench>()
                .HasRequired(b => b.User)
                .WithMany()
                .WillCascadeOnDelete(false);
        }

    }
}