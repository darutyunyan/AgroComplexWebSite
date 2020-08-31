using AgroComplexService.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface IProductNameRepository
	{
		Task Add(ProductName productName);

		Task<List<ProductName>> GetAll();

		Task Remove(Guid id);
	}
}
