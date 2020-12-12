using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace collab_api.Model
{
    public class Inventory
    {
        public List<Commodity> Commodities;

        public List<Vendor> Vendors;

        public List<string> Brands;

        public List<string> CommodityTypes;
    }
}
