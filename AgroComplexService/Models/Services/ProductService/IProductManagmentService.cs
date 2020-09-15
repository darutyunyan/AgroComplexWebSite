using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.Product;
using AgroComplexService.Dto.ProductName;
using AgroComplexService.Dto.ProductType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Services.ProductService
{
	public interface IProductManagmentService
	{
		Task<InitAddProductResponse> InitAddProduct();

		Task AddProduct(AddProductRequest request);

		Task<GetAllProductsResponse> GetAllProducts();

		Task RemoveProduct(RemoveProductRequest request);


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