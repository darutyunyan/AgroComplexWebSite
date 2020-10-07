using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AgroComplexService.Dto;
using AgroComplexService.Dto.Client;
using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.Product;
using AgroComplexService.Dto.ProductName;
using AgroComplexService.Dto.ProductType;
using AgroComplexService.Models.DataBase;
using AgroComplexService.Models.Services.ProductService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgroComplexService.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class ProductController : BaseController
	{
		#region Constructor

		public ProductController(AgroComplexDBContext context)
		{
			_productServ = new ProductManagmentService(context);
		}

		#endregion

		#region Admin public methods


		[Route("InitAddProduct")]
		[HttpGet]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<InitAddProductResponse> InitAddProduct()
		{
			InitAddProductResponse response = new InitAddProductResponse();

			try
			{
				response = await _productServ.InitAddProduct();
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("AddProduct")]
		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<Response> AddProduct(AddProductRequest request)
		{
			Response response = new Response();

			try
			{
				await _productServ.AddProduct(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("GetAllProducts")]
		[HttpGet]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<GetAllProductsResponse> GetAllProducts()
		{
			GetAllProductsResponse response = new GetAllProductsResponse();

			try
			{
				response = await _productServ.GetAllProducts();
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("RemoveProduct")]
		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<Response> RemoveProduct(RemoveProductRequest request)
		{
			Response response = new Response();

			try
			{
				await _productServ.RemoveProduct(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("AddColumnType")]
		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<Response> AddColumnType(AddColumnTypeRequest request)
		{
			Response response = new Response();

			try
			{
				await _productServ.AddColumnType(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex); 
			}

			return response;
		}


		[Route("RemoveColumnType")]
		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<Response> RemoveColumnType(RemoveColumnTypeRequest request)
		{
			Response response = new Response();

			try
			{
				await _productServ.RemoveColumnType(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("GetColumnTypes")]
		[HttpGet]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<ColumnTypesResponse> GetColumnTypes()
		{
			ColumnTypesResponse response = new ColumnTypesResponse();

			try
			{
				response = await _productServ.GetColumnTypes();
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("AddProductName")]
		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<Response> AddProductName(AddProductNameRequest request)
		{
			Response response = new Response();

			try
			{
				await _productServ.AddProductName(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("RemoveProductName")]
		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<Response> RemoveProductName(RemoveProductNameRequest request)
		{
			Response response = new Response();

			try
			{
				await _productServ.RemoveProductName(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("GetProductNames")]
		[HttpGet]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<GetProductNamesResponse> GetProductNames()
		{
			GetProductNamesResponse response = new GetProductNamesResponse();

			try
			{
				response = await _productServ.GetProductNames();
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("AddProductType")]
		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<Response> AddProductType(AddProductTypeRequest request)
		{
			Response response = new Response();

			try
			{
				await _productServ.AddProductType(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("RemoveProductType")]
		[HttpPost]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<Response> RemoveProductType(RemoveProductTypeRequest request)
		{
			Response response = new Response();

			try
			{
				await _productServ.RemoveProductType(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("GetProductTypes")]
		[HttpGet]
		[Authorize(AuthenticationSchemes = "Bearer")]
		public async Task<GetProductTypesResponse> GetProductTypes()
		{
			GetProductTypesResponse response = new GetProductTypesResponse();

			try
			{
				response = await _productServ.GetProductTypes();
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		#endregion

		#region Client public methods

		[Route("InitHomePage")]
		[HttpGet]
		public async Task<InitHomePageResponse> InitHomePage()
		{
			InitHomePageResponse response = new InitHomePageResponse();

			try
			{
				response = await _productServ.InitHomePage();
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}
		
		[Route("GetProductNamesByType")]
		[HttpPost]
		public async Task<Response> GetProductNamesByType(GetProductNamesByTypeRequest request)
		{
			GetProductNamesByTypeResponse response = new GetProductNamesByTypeResponse();

			try
			{
				response = await _productServ.GetProductNamesByType(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("GetProductById")]
		[HttpPost]
		public async Task<Response> GetProductById(GetProductByIdRequest request)
		{
			GetProductByIdResponse response = new GetProductByIdResponse();

			try
			{
				response = await _productServ.GetProductById(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("GetFirstProductByType")]
		[HttpPost]
		public async Task<Response> GetFirstProductByType(GetFirstProductByTypeRequest request)
		{
			GetFirstProductByTypeResponse response = new GetFirstProductByTypeResponse();

			try
			{
				response = await _productServ.GetFirstProductByType(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		#endregion

		#region Private property

		private IProductManagmentService _productServ = null;

		#endregion
	}
}
