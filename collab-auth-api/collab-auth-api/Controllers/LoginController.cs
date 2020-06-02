using collab_auth_api.Models;
using collab_auth_api.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace collab_auth_api.Controllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        IUserAuthenticationService loginService;
        IEncryptionService encryptionSvc;

        public LoginController(IUserAuthenticationService authSvc, IEncryptionService encryptionSvc)
        {
            this.loginService = authSvc;
            this.encryptionSvc = encryptionSvc;
        }

        [HttpPost("api/Login")]
        public ActionResult Authenticate([FromBody] LoginCred cred)
        {
            LoginResponse resp = new LoginResponse();

            try
            {
                cred.Password = encryptionSvc.Decipher(cred.Password);

                var token = loginService.Authenticate(cred.Email, cred.Password);

                if (token == null)
                {
                    resp.IsAuthenticated = false;
                    resp.Message = "Invalid login credentials";
                    return new JsonResult(resp);
                }
                else
                {
                    resp.IsAuthenticated = true;
                    resp.Message = "User authenticated";
                    resp.Token = token;
                    return new JsonResult(resp);
                }
            }
            catch (System.Exception ex)
            {
                resp.IsAuthenticated = false;
                resp.Message = ex.Message;
                return new JsonResult(resp);
            }
        }
    }
}