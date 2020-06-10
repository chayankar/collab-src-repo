using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using collab_auth_api.Entitties;
using collab_auth_api.Models;
using collab_auth_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace collab_auth_api.Controllers
{
    [ApiController]
    public class EncryptionKeyController : ControllerBase
    {
        IEncryptionService encryptionSvc;

        public EncryptionKeyController(IEncryptionService encryptionSvc)
        {
            this.encryptionSvc = encryptionSvc;
        }

        [Route("api/encryptionKey")]
        [AllowAnonymous]
        public ActionResult GetEncryptionKey()
        {
            EncyptionKey encmodel = encryptionSvc.GetEncryptionKey();
            return new JsonResult(encmodel);
        }
    }
}