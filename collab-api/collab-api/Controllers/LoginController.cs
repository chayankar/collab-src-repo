using collab_api.Model;
using collab_api.Model;
using collab_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace collab_api.Controllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        IUserAuthenticationService loginService;
        IEncryptionService encryptionSvc;
        ISecurityTokenService securityTokenSvc;

        public LoginController(IUserAuthenticationService authSvc, IEncryptionService encryptionSvc, ISecurityTokenService securityTokenSvc)
        {
            this.loginService = authSvc;
            this.encryptionSvc = encryptionSvc;
            this.securityTokenSvc = securityTokenSvc;
        }

        [HttpPost("api/Login")]
       
        public IActionResult Authenticate([FromBody] LoginCred cred)
        {
            LoginResponse resp = new LoginResponse();

            try
            {
                cred.Password = encryptionSvc.Decipher(cred.Password);

                User user = loginService.AuthenticateUser(cred.Email, cred.Password);

                if (user == null)
                {
                    resp.IsAuthenticated = false;
                    resp.Message = "Invalid login credentials";
                    return new JsonResult(resp);
                }
                else
                {
                    resp.IsAuthenticated = true;
                    resp.Message = "User authenticated";
                    // TODO: generate session id if session id is REALLY required in JWT !!!
                    string authToken = securityTokenSvc.GenerateSecurityToken(user, "f9aec8e3-af07-4362-ae08-53ea16dbf2f0");
                    this.HttpContext.Response.Cookies.Append("AuthToken", authToken, new CookieOptions()
                    {
                        HttpOnly = false,
                        SameSite = SameSiteMode.Lax,
                        Secure = false,
                        // Expires = new DateTimeOffset(DateTime.UtcNow.AddMinutes(60), TimeSpan.Zero)
                    }); ;
                }
            }
            catch (Exception ex)
            {
                resp.IsAuthenticated = false;
                resp.Message = "Internal server error";
            }

            return new JsonResult(resp);

        }
    }
}