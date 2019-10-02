using AirBench.Data;
using AirBench.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace AirBench.Repository
{
    public class BenchAPIRepository : IBenchRepository
    {
        async public Task<List<Bench>> GetAll()
        {
            using(var context = new Context())
            {
                List<Bench> benches = await context.Benches
                    .Include(b => b.User)
                    .Include(b => b.Reviews)
                    .ToListAsync();
                return benches;
            }
        } 
    }
}