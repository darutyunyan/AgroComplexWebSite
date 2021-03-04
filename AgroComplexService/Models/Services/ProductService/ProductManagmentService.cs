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

			response.Items = items.ToArray();

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

			bool exist = await _columnTypeRepo.IsExist(request.Name);

			if (exist)
				throw new BusinessException(_localizer["Product_AddDublicateColumnTypeMessage"]);

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

			response.Items = items.ToArray();

			return response;
		}

		public async Task AddProductName(AddProductNameRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			if (string.IsNullOrEmpty(request.Name))
				throw new ArgumentException("name");

			if (string.IsNullOrEmpty(request.TypeId))
				throw new ArgumentException("productTypeId");

			bool exist = await _productNameRepo.IsExist(request.Name);

			if (exist)
				throw new BusinessException(_localizer["Product_AddDublicateProductNameMessage"]);

			ProductName productName = new ProductName()
			{
				Id = Guid.NewGuid(),
				Name = request.Name,
				ProductTypeId = Guid.Parse(request.TypeId)
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
					Type = item.ProductType.Name
				});
			}

			response.Items = items.ToArray();

			return response;
		}


		public async Task AddProductType(AddProductTypeRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			bool exist = await _productTypeRepo.IsExist(request.Name);

			if (exist)
				throw new BusinessException(_localizer["Product_AddDublicateProductTypeMessage"]);

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

			response.Items = items.ToArray();

			return response;
		}


		#endregion

		#region Client public methods

		/// <summary>
		/// Gets products, which contain info.
		/// </summary>
		public async Task<GetAllResponse> GetAll()
		{
			GetAllResponse response = new GetAllResponse();

			List<Product> products = await _productRepo.GetAll();
			List<ProductName> allNames = products.Select(p => p.ProductName).Distinct().ToList();
			List<ProductType> allTypes = await _productTypeRepo.GetAll();

			List<GetAllItem> items = new List<GetAllItem>();
			foreach (var type in allTypes)
			{
				List<NameItem> names = allNames
					.Where(n => n.ProductType.Name == type.Name)
					.Select(i => new NameItem { Id = i.Id.ToString(), Name = i.Name })
					.ToList();

				if (names.Count > 0)
				{
					items.Add(new GetAllItem
					{
						TypeName = type.Name,
						Items = names.ToArray()
					});
				}
			}

			response.Items = items.OrderByDescending(i => i.TypeName).ToArray();

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
