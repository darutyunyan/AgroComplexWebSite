using AgroComplexService.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface IProductTypeRepository
	{
		Task Add(ProductType productType);

		Task<List<ProductType>> GetAll();

		Task Remove(Guid id);
	}
}
