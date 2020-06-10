using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace collab_auth_api.Models
{
    public class JWTAuthConfig
    {
        public string JWTSecretKey { get; set; }

        public string Issuer { get; set; }

        public string Audience { get; set; }
    }
}
