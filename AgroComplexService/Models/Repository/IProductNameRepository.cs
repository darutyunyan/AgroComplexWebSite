using AgroComplexService.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface IProductNameRepository
	{
		Task AddProductName(ProductName productName);

		Task<List<ProductName>> GetProductNames();

		Task RemoveProductName(Guid id);
	}
}
