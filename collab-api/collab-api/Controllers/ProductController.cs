using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace collab_api.Controllers
{
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet("api/Product/SearchList")]
        public async Task<ActionResult> GetProductSearchList()
        {
            return null;
        }

        [HttpGet("api/Product/Category")]
        public async Task<ActionResult> GetProductByCategory()
        {
            return null;
        }
    }
}