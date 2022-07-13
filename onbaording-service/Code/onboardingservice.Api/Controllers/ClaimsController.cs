using System.Collections.Generic;
using onboardingservice.Business.Interfaces;
using onboardingservice.Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace onboardingservice.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClaimsController : ControllerBase
    {
        IClaimsService _ClaimsService;
        public ClaimsController(IClaimsService ClaimsService)
        {
            _ClaimsService = ClaimsService;
        }

        // GET: api/Claims
        [HttpGet]
        public ActionResult<IEnumerable<Claims>> Get()
        {
            return Ok(_ClaimsService.GetAll());
        }

        [HttpPost]
        public ActionResult<Claims> Save(Claims Claims)
        {
            return Ok(_ClaimsService.Save(Claims));

        }

        [HttpPut("{id}")]
        public ActionResult<Claims> Update([FromRoute] string id, Claims Claims)
        {
            return Ok(_ClaimsService.Update(id, Claims));

        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            return Ok(_ClaimsService.Delete(id));

        }


    }
}
