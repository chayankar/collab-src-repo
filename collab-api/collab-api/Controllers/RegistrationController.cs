using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using collab_api.DbModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace collab_api.Controllers
{
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        [HttpPost("api/Register")]
        public IActionResult Register()
        {
            return Ok();
        }
    }
}