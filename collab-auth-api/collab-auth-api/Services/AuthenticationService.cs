using collab_auth_api.Entitties;
using collab_auth_api.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace collab_auth_api.Services
{
    public interface IUserAuthenticationService
    {
        string Authenticate(string email, string password);
    }

    public class AuthenticationService : IUserAuthenticationService
    {
        AppSettings appSettings;

        List<User> users = new List<User>()
        {
            new User(){ Password= "Test123", Email = "chayankar209@gmail.com"}
        };

        public AuthenticationService(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
        }

        public string Authenticate(string email, string password)
        {
            User user = users.FirstOrDefault(x => x.Email.Equals(email) && x.Password.Equals(password));

            if (user == null) return null;

            return Guid.NewGuid().ToString();

            //var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes(appSettings.JWTSecretKey);
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(new Claim[]
            //    {
            //        new Claim(ClaimTypes.Name, user.Id.ToString())
            //    }),
            //    Expires = DateTime.UtcNow.AddDays(7),
            //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            //};

            //var token = tokenHandler.CreateToken(tokenDescriptor);
            //return tokenHandler.WriteToken(token);
        }
    }
}
