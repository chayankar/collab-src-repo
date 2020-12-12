
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using collab_api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace collab_api.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
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