using collab_api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace collab_api.Services
{
    public interface IProductService
    {
        bool AddProduct(Commodity commodity);

        bool AddProducts(List<Commodity> commodities);
    }

    public class ProductService : IProductService
    {
        public bool AddProducts(List<Commodity> commodities)
        {
            throw new NotImplementedException();
        }

        public bool AddProduct(Commodity commodity)
        {
            throw new NotImplementedException();
        }
    }
}
