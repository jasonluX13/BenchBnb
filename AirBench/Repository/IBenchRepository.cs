using AirBench.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBench.Repository
{
    public interface IBenchRepository
    {
        Task<List<Bench>> GetAll();
    }
}
