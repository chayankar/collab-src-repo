using collab_auth_api.Entitties;
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
    public interface ILoginService
    {
        User Authenticate(string userName, string password);
    }

    public class LoginService : ILoginService
    {
        AppSettings appSettings;

        List<User> users = new List<User>()
        {
            new User(){Id=1, FirstName = "Chayan", LastName="Kar", Password= "Test", Username = "chayan"}
        };

        public LoginService(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
        }

        public User Authenticate(string userName, string password)
        {
            User user = users.FirstOrDefault(x => x.Username.Equals(userName) && x.Password.Equals(password));

            if (user == null) return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.JWTSecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }
    }
}
