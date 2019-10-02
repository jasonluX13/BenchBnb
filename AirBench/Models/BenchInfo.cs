using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirBench.Models
{
    public class BenchInfo
    {
        public string Description { get; set; }
        public int NumSeats { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}