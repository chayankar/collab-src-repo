using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace collab_api.Model
{
    public class LoginResponse
    {
        public string SessionId { get; set; }

        public string Message { get; set; }

        public bool IsAuthenticated { get; set; }
    }
}
