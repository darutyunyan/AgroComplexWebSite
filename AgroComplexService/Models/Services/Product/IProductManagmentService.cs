using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.ProductName;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Services.Product
{
	public interface IProductManagmentService
	{
		Task AddColumnType(AddColumnTypeRequest request);

		Task<ColumnTypesResponse> GetColumnTypes();

		Task AddProductName(AddProductNameRequest request);

		Task<GetProductNamesResponse> GetProductNames();
	}
}
