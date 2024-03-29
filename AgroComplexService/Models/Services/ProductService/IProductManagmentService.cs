using AgroComplexService.Dto.Client;
using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.Product;
using AgroComplexService.Dto.ProductName;
using AgroComplexService.Dto.ProductType;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Services.ProductService
{
	public interface IProductManagmentService
	{
		Task AddUpdateProduct(AddUpdateProductRequest request);

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


		Task<GetAllResponse> GetAll();

		Task<GetProductByIdResponse> GetProductById(GetProductByIdRequest request);
	}
}
