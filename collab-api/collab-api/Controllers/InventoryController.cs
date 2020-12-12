using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using collab_api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace collab_api.Controllers
{
    [ApiController]
    public class InventoryController : ControllerBase
    {
        [HttpGet("api/Inventory")]
        public async Task<ActionResult> GetInventory()
        {
            return null;
        }

        [HttpPost("api/Inventory/Add/Products")]
        public async Task<ActionResult> AddCommodities([FromBody] List<Commodity> commList)
        {
            return null;
        }
    }
}