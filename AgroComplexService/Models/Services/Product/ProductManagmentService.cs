using AgroComplexService.Dto;
using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.ProductName;
using AgroComplexService.Dto.ProductType;
using AgroComplexService.Models.DataBase;
using AgroComplexService.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Services.Product
{
	public class ProductManagmentService : IProductManagmentService
	{
		#region Constructor

		public ProductManagmentService(AgroComplexDBContext contect)
		{
			_productRepo = new ProductRepository(contect);
			_productNameRepo = new ProductNameRepository(contect);
			_productTypeRepo = new ProductTypeRespository(contect);
			_columnTypeRepo = new ColumnTypeRepository(contect);
		}

		#endregion

		#region Public methods

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

			response.ColumnTypes = items.ToArray();

			return response;
		}

		public async Task AddProductName(AddProductNameRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

			ProductName productName = new ProductName()
			{
				Id = Guid.NewGuid(),
				Name = request.Name
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
					Name = item.Name
				});
			}

			response.ProductNames = items.ToArray();

			return response;
		}


		public async Task AddProductType(AddProductTypeRequest request)
		{
			if (request == null)
				throw new ArgumentException("request");

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

			response.ProductTypes = items.ToArray();

			return response;
		}


		#endregion

		#region Private property

		private IProductRepository _productRepo = null;

		private IProductNameRepository _productNameRepo = null;

		private IProductTypeRepository _productTypeRepo = null;

		private IColumnTypeRepository _columnTypeRepo = null;

		#endregion
	}
}
