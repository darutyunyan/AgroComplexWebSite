using AgroComplexService.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface IProductTypeRepository
	{
		Task AddProductType(ProductType productType);

		Task<List<ProductType>> GetProductTypes();

		Task RemovProductType(Guid id);
	}
}
