using collab_api.Model;
using collab_api.Model;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;

namespace collab_api.Services
{
    public interface IUserAuthenticationService
    {
        User AuthenticateUser(string email, string password);
    }

    public class AuthenticationService : IUserAuthenticationService
    {
        JWTAuthConfig appSettings;

        List<User> users = new List<User>()
        {
            new User(){ Password= "Test123", Email = "chayankar209@gmail.com"}
        };

        public AuthenticationService(IOptions<JWTAuthConfig> appSettings)
        {
            this.appSettings =appSettings.Value;
        }

        public User AuthenticateUser(string email, string password)
        {
            // TODO: Compare email & password from identity db
            return users.FirstOrDefault(x => x.Email.Equals(email) && x.Password.Equals(password));
        }
    }
}
