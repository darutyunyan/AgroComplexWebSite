using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public class ProductTypeRespository : IProductTypeRepository
	{
		#region Constructor

		public ProductTypeRespository(AgroComplexDBContext contect)
		{
			_context = contect;
		}

		#endregion

		#region Public methods

		public async Task Add(ProductType productType)
		{
			if (productType == null)
				throw new ArgumentNullException("productType");

			await _context.ProductType.AddAsync(productType);
			await _context.SaveChangesAsync();
		}

		public async Task<List<ProductType>> GetAll()
		{
			return await _context.ProductType.ToListAsync();
		}

		public async Task Remove(Guid id)
		{
			if (id == Guid.Empty)
				throw new ArgumentException("id");


			ProductType productType = await _context
				.ProductType
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();

			_context.ProductType.Remove(productType);
			await _context.SaveChangesAsync();
		}

		#endregion

		#region Private property

		private AgroComplexDBContext _context = null;

		#endregion
	}
}
