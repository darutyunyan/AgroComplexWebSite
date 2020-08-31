using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public class ProductNameRepository : IProductNameRepository
	{
		#region Constructor

		public ProductNameRepository(AgroComplexDBContext contect)
		{
			_context = contect;
		}

		#endregion

		#region Public methods

		public async Task Add(ProductName productName)
		{
			if (productName == null)
				throw new ArgumentNullException("productName");

			await _context.ProductName.AddAsync(productName);
			await _context.SaveChangesAsync();
		}

		public async Task<List<ProductName>> GetAll()
		{
			return await _context.ProductName.ToListAsync();
		}

		public async Task Remove(Guid id)
		{
			if (id == Guid.Empty)
				throw new ArgumentException("id");

			ProductName productName = await _context
				.ProductName
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();

			_context.ProductName.Remove(productName);
			await _context.SaveChangesAsync();
		}

		#endregion

		#region Private property

		private AgroComplexDBContext _context = null;

		#endregion
	}
}
