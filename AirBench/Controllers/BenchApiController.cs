using AirBench.Models;
using AirBench.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;



namespace AirBench.Controllers
{
    [RoutePrefix("api/bench")]
    public class BenchApiController : ApiController
    {
        private IBenchRepository _repository;

        public BenchApiController(IBenchRepository repository)
        {
            _repository = repository;
        }

        [Route("all")]
        async public Task<BenchResponse> Get()
        {
            List<Bench> benches = await _repository.GetAll();
            List<BenchInfo> infos = benches
                .Select(x => new BenchInfo() { Description = x.Description, Latitude = x.Latitude, Longitude = x.Longitude, NumSeats = x.NumSeats })
                .ToList();

            BenchResponse response = new BenchResponse()
            {
                Benches = infos
            };
            return response;
        }



    }
}
