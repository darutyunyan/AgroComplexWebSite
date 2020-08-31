using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AgroComplexService.Dto;
using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.ProductName;
using AgroComplexService.Models.DataBase;
using AgroComplexService.Models.Services.Product;
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

		#region Public methods

		[Route("AddColumnType")]
		[HttpPost]
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

		[Route("GetColumnTypes")]
		[HttpGet]
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

		[Route("GetProductNames")]
		[HttpGet]
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


		#endregion

		#region Private property

		private IProductManagmentService _productServ = null;

		#endregion
	}
}
