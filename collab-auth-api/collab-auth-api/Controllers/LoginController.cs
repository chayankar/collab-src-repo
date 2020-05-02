using collab_auth_api.Entitties;
using collab_auth_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace collab_auth_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        ILoginService loginService;

        public LoginController(ILoginService loginService)
        {
            this.loginService = loginService;
        }

        [AllowAnonymous]
        [HttpPost()]
        public IActionResult Authenticate([FromBody] LoginCred cred)
        {
            var token = loginService.Authenticate(cred.Username, cred.Password);

            if (token == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(token);
        }
    }
}