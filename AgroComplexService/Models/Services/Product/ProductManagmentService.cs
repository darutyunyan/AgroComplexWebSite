using AgroComplexService.Dto;
using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.ProductName;
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

			await _columnTypeRepo.AddColumnType(columnType);
		}


		public async Task<ColumnTypesResponse> GetColumnTypes()
		{
			ColumnTypesResponse response = new ColumnTypesResponse();
			List<ColumnTypeItem> items = new List<ColumnTypeItem>();

			foreach (var item in await _columnTypeRepo.GetColumnTypes())
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

			await _productNameRepo.AddProductName(productName);
		}


		public async Task<GetProductNamesResponse> GetProductNames()
		{
			GetProductNamesResponse response = new GetProductNamesResponse();
			List<ProductNameItem> items = new List<ProductNameItem>();

			foreach (var item in await _productNameRepo.GetProductNames())
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

		#endregion

		#region Private property

		private IProductRepository _productRepo = null;

		private IProductNameRepository _productNameRepo = null;

		private IColumnTypeRepository _columnTypeRepo = null;

		#endregion
	}
}
