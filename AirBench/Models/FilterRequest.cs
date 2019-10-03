using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirBench.Models
{
    public class FilterRequest
    {
        public FilterRequest(int? min, int? max)
        {
            Min = min;
            Max = max; 
        }
        public int? Min { get; set; }
        public int? Max { get; set; }
    }
}