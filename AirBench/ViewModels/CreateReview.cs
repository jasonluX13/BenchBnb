using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AirBench.ViewModels
{
    public class CreateReview
    {
        [Range(1,5)]
        [Required]
        public int Rating { get; set; }

        [Required]
        public string Feedback { get; set; }

    }
}