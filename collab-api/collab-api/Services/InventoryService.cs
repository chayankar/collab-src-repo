using collab_api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace collab_api.Services
{
    public interface IInventoryService
    {
        Inventory GetInventory();
    }

    public class InventoryService : IInventoryService
    {
        public Inventory GetInventory()
        {
            throw new NotImplementedException();
        }
    }
}
