using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
			Debug.Assert(productType.Id != Guid.Empty);
			Debug.Assert(!string.IsNullOrEmpty(productType.Name));

			await _context.ProductType.AddAsync(productType);
			await _context.SaveChangesAsync();
		}

		public async Task<List<ProductType>> GetAll()
		{
			return await _context
				.ProductType
				.OrderBy(p => p.Name)
				.ToListAsync();
		}

		public async Task<bool> IsExist(string name)
		{
			Debug.Assert(!string.IsNullOrEmpty(name));

			return await _context
				.ProductType
				.AnyAsync(p => p.Name.ToLower() == name.ToLower());
		}

		public async Task Remove(Guid id)
		{
			Debug.Assert(id != Guid.Empty);

			ProductType productType = await _context
				.ProductType
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();

			if (productType == null)
				throw new ArgumentNullException();

			_context.ProductType.Remove(productType);
			await _context.SaveChangesAsync();
		}

		#endregion

		#region Private property

		private AgroComplexDBContext _context = null;

		#endregion
	}
}
