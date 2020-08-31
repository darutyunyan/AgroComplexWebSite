using AgroComplexService.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface IProductRepository
	{
		Task AddProduct(Product product);

		Task UpdateProduct(Product product);

		Task<Product> GetProductById(Guid id);

		Task<List<Product>> GetProductsByType(string name);

		Task<List<ProductType>> GetAll();

		Task RemoveProduct(Guid id);
	}
}
