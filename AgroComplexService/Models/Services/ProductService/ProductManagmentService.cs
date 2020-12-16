using AgroComplexService.Dto.Client;
using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.Product;
using AgroComplexService.Dto.ProductName;
using AgroComplexService.Dto.ProductType;
using AgroComplexService.Models.DataBase;
using AgroComplexService.Models.Exceptions;
using AgroComplexService.Models.Repository;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Services.ProductService
{
	public class ProductManagmentService : IProductManagmentService
	{
		#region Constructor

		public ProductManagmentService(AgroComplexDBContext contect, IStringLocalizer<Resource> localizer)
		{
			_productRepo = new ProductRepository(contect);
			_productNameRepo = new ProductNameRepository(contect);
			_productTypeRepo = new ProductTypeRespository(contect);
			_columnTypeRepo = new ColumnTypeRepository(contect);
			_localizer = localizer;
		}

		#endregion

		#region Admin public methods

		public async Task<InitAddProductResponse> InitAddProduct()
		{
			InitAddProductResponse response = new InitAddProductResponse();

			List<ProductNameItem> productNames = new List<ProductNameItem>();
			foreach (var item in await _productNameRepo.GetAll())
			{
				productNames.Add(new ProductNameItem()
				{
					Id = item.Id,
					Name = item.Name
				});
			}

			List<ColumnTypeItem> columnTypes = new List<ColumnTypeItem>();
			foreach (var item in await _columnTypeRepo.GetAll())
			{
				columnTypes.Add(new ColumnTypeItem()
				{
					Id = item.Id,
					Name = item.Name
				});
			}

			response.ProductNames = productNames.ToArray();
			response.ColumnTypes = columnTypes.ToArray();

			return response;
		}

		public async Task AddProduct(AddProductRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			if (string.IsNullOrEmpty(request.Info))
				throw new ArgumentException("info");

			if (string.IsNullOrEmpty(request.ProductNameId))
				throw new ArgumentException("productNameId");

			if (string.IsNullOrEmpty(request.ColumnTypeId))
				throw new ArgumentException("columnTypeId");

			Product product = new Product()
			{
				Id = Guid.NewGuid(),
				Info = request.Info,
				ColumnTypeId = Guid.Parse(request.ColumnTypeId),
				ProductNameId = Guid.Parse(request.ProductNameId)
			};

			await _productRepo.Add(product);
		}

		public async Task<GetAllProductsResponse> GetAllProducts()
		{
			GetAllProductsResponse response = new GetAllProductsResponse();
			List<ProductItem> items = new List<ProductItem>();

			foreach (var item in await _productRepo.GetAll())
			{
				items.Add(new ProductItem()
				{
					Id = item.Id,
					Info = item.Info,
					ProductType = item.ProductName.ProductType.Name,
					ProductName = item.ProductName.Name,
					ColumnType = item.ColumnType.Name
				});
			}

			response.ProductItems = items.ToArray();

			return response;
		}

		public async Task RemoveProduct(RemoveProductRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			await _productRepo.Remove(Guid.Parse(request.Id));
		}

		public async Task AddColumnType(AddColumnTypeRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			ColumnType columnType = new ColumnType()
			{
				Id = Guid.NewGuid(),
				Name = request.Name
			};

			await _columnTypeRepo.Add(columnType);
		}

		public async Task RemoveColumnType(RemoveColumnTypeRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			await _columnTypeRepo.Remove(Guid.Parse(request.Id));
		}

		public async Task<ColumnTypesResponse> GetColumnTypes()
		{
			ColumnTypesResponse response = new ColumnTypesResponse();
			List<ColumnTypeItem> items = new List<ColumnTypeItem>();

			foreach (var item in await _columnTypeRepo.GetAll())
			{
				items.Add(new ColumnTypeItem()
				{
					Id = item.Id,
					Name = item.Name
				});
			}

			response.Types = items.ToArray();

			return response;
		}

		public async Task AddProductName(AddProductNameRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			if (string.IsNullOrEmpty(request.ProductTypeId))
				throw new ArgumentException("productTypeId");

			ProductName productName = new ProductName()
			{
				Id = Guid.NewGuid(),
				Name = request.Name,
				ProductTypeId = Guid.Parse(request.ProductTypeId)
			};

			await _productNameRepo.Add(productName);
		}

		public async Task RemoveProductName(RemoveProductNameRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			await _productNameRepo.Remove(Guid.Parse(request.Id));
		}

		public async Task<GetProductNamesResponse> GetProductNames()
		{
			GetProductNamesResponse response = new GetProductNamesResponse();
			List<ProductNameItem> items = new List<ProductNameItem>();

			foreach (var item in await _productNameRepo.GetAll())
			{
				items.Add(new ProductNameItem()
				{
					Id = item.Id,
					Name = item.Name,
					ProductType = item.ProductType.Name
				});
			}

			response.ProductNames = items.ToArray();

			return response;
		}


		public async Task AddProductType(AddProductTypeRequest request)
		{
			//request = null;
			if (request == null)
				throw new ArgumentException("request");

			bool exist = await _productTypeRepo.IsExist(request.Name);

			if (exist)
				throw new BusinessException(_localizer["AddDublicateProductTypeMessage"]);

			ProductType productType = new ProductType()
			{
				Id = Guid.NewGuid(),
				Name = request.Name
			};

			await _productTypeRepo.Add(productType);
		}

		public async Task RemoveProductType(RemoveProductTypeRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			await _productTypeRepo.Remove(Guid.Parse(request.Id));
		}

		public async Task<GetProductTypesResponse> GetProductTypes()
		{
			GetProductTypesResponse response = new GetProductTypesResponse();
			List<ProductTypeItem> items = new List<ProductTypeItem>();

			foreach (var item in await _productTypeRepo.GetAll())
			{
				items.Add(new ProductTypeItem()
				{
					Id = item.Id,
					Name = item.Name
				});
			}

			response.Types = items.ToArray();

			return response;
		}


		#endregion

		#region Client public methods

		public async Task<InitHomePageResponse> InitHomePage()
		{
			InitHomePageResponse response = new InitHomePageResponse();

			List<ProductNameItem> seeds = new List<ProductNameItem>();
			foreach (var item in await _productNameRepo.GetByProductType(SEED))
			{
				seeds.Add(new ProductNameItem()
				{
					Id = item.Id,
					Name = item.Name
				});
			}

			List<ProductNameItem> planProtectionProducts = new List<ProductNameItem>();
			foreach (var item in await _productNameRepo.GetByProductType(PPP))
			{
				planProtectionProducts.Add(new ProductNameItem()
				{
					Id = item.Id,
					Name = item.Name
				});
			}

			response.Seeds = seeds.ToArray();
			response.PlanProtectionProducts = planProtectionProducts.ToArray();

			return response;
		}

		public async Task<GetProductNamesByTypeResponse> GetProductNamesByType(GetProductNamesByTypeRequest request)
		{
			GetProductNamesByTypeResponse response = new GetProductNamesByTypeResponse();

			List<ProductNameItem> items = new List<ProductNameItem>();
			foreach (var item in await _productNameRepo.GetByProductType(request.ProductType))
			{
				items.Add(new ProductNameItem()
				{
					Id = item.Id,
					Name = item.Name
				});
			}

			response.Items = items.OrderBy(i => i.Name).ToArray();

			return response;
		}

		public async Task<GetProductByIdResponse> GetProductById(GetProductByIdRequest request)
		{
			GetProductByIdResponse response = new GetProductByIdResponse();
			var products = await _productRepo.GetProductsByProductTypeId(Guid.Parse(request.Id));

			if (products.Count > 0)
			{
				string productName = products.First().ProductName.Name;
				string[] columnNames = products.First().ColumnType.Name.Split('|').ToArray();
				List<string[]> rows = new List<string[]>();
				foreach (var product in products)
				{
					var info = product.Info.Split('|').ToArray();
					rows.Add(info);
				}

				response.ProductName = productName;
				response.ColumnNames = columnNames;
				response.Info = rows.ToArray();
			}

			return response;
		}

		public async Task<GetFirstProductByTypeResponse> GetFirstProductByType(GetFirstProductByTypeRequest requet)
		{
			GetFirstProductByTypeResponse response = new GetFirstProductByTypeResponse();
			var productNames = await _productNameRepo.GetAll();

			var firstProductName = productNames
				.Where(p => p.ProductType.Name == requet.Name)
				.OrderBy(p => p.Name)
				.First();

			var products = await _productRepo.GetAll();

			var fristProduct = products
				.Where(p => p.ProductNameId == firstProductName.Id)
				.ToList();


			List<string[]> rows = new List<string[]>();
			foreach (var product in fristProduct)
			{
				var info = product.Info.Split('|').ToArray();
				rows.Add(info);
			}

			response.ProductName = fristProduct.First().ProductName.Name;
			response.ColumnNames = fristProduct.First().ColumnType.Name.Split('|').ToArray();
			response.Info = rows.ToArray();

			return response;
		}

		#endregion

		#region Private constant

		private const string SEED = "Семена";

		private const string PPP = "СЗР";

		#endregion

		#region Private property

		private IProductRepository _productRepo = null;

		private IProductNameRepository _productNameRepo = null;

		private IProductTypeRepository _productTypeRepo = null;

		private IColumnTypeRepository _columnTypeRepo = null;

		private readonly IStringLocalizer<Resource> _localizer;

		#endregion
	}
}
