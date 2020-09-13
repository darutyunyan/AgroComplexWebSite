using AgroComplexService.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface IProductRepository
	{
		Task Add(Product product);

		Task Update(Product product);

		Task<Product> GetById(Guid id);

		Task<List<Product>> GetByType(string name);

		Task<List<Product>> GetAll();

		Task Remove(Guid id);
	}
}
