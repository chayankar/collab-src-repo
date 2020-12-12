using collab_api.Model;
using collab_api.Model;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace collab_api.Services
{
    public interface ISecurityTokenService
    {
        string GenerateSecurityToken(User user, string sessionId);
    }

    public class JWTService : ISecurityTokenService
    {
        JWTAuthConfig config;

        const string sessionID = "f9aec8e3-af07-4362-ae08-53ea16dbf2f0";

        public JWTService(IOptions<JWTAuthConfig> config)
        {
            this.config = config.Value;
        }

        public string GenerateSecurityToken(User user, string sessionId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(config.JWTSecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email.ToString()),
                }),
                Expires = DateTime.UtcNow.AddMinutes(60),
                Issuer = config.Issuer,
                Audience = config.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
