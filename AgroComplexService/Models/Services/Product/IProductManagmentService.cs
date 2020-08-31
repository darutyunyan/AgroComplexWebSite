using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.Product;
using AgroComplexService.Dto.ProductName;
using AgroComplexService.Dto.ProductType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Services.Product
{
	public interface IProductManagmentService
	{
		Task<InitAddProductResponse> InitAddProduct();


		Task AddColumnType(AddColumnTypeRequest request);

		Task RemoveColumnType(RemoveColumnTypeRequest request);

		Task<ColumnTypesResponse> GetColumnTypes();


		Task AddProductName(AddProductNameRequest request);

		Task RemoveProductName(RemoveProductNameRequest request);

		Task<GetProductNamesResponse> GetProductNames();


		Task AddProductType(AddProductTypeRequest request);

		Task RemoveProductType(RemoveProductTypeRequest request);

		Task<GetProductTypesResponse> GetProductTypes();
	}
}
