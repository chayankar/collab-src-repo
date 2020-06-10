
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using collab_auth_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace collab_auth_api.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("api/user")]
        public IActionResult User()
        {
            return new JsonResult(new RegUser() { Name = "Chayan", Age = 28 });
        }

        [HttpPost("api/register/user")]
        [Authorize]
        public IActionResult RegisterUser([FromBody] LoginCred cred)
        {
            return new JsonResult(new RegUser() { Name = "Chayan", Age = 28 });
        }

    }

    public class RegUser
    {
        public string Name;
        public int Age;
    }
}