using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
			Debug.Assert(productName.Id != Guid.Empty);
			Debug.Assert(!string.IsNullOrEmpty(productName.Name));
			Debug.Assert(productName.ProductTypeId != Guid.Empty);

			await _context.ProductName.AddAsync(productName);
			await _context.SaveChangesAsync();
		}

		public async Task<List<ProductName>> GetAll()
		{
			return await _context
				.ProductName
				.OrderBy(n => n.Name)
				.Include(pT => pT.ProductType).ToListAsync();
		}

		public async Task<List<ProductName>> GetByProductType(string name)
		{
			Debug.Assert(!string.IsNullOrEmpty(name));

			return await _context.ProductName
				.Include(pT => pT.ProductType)
				.Where(pN => pN.ProductType.Name == name)
				.OrderBy(n => n.Name)
				.ToListAsync();
		}

		public async Task<bool> IsExist(string name)
		{
			Debug.Assert(!string.IsNullOrEmpty(name));

			return await _context.ProductName.AnyAsync(p => p.Name.ToLower() == name.ToLower());
		}

		public async Task Remove(Guid id)
		{
			Debug.Assert(id != Guid.Empty);

			ProductName productName = await _context
				.ProductName
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();

			if (productName == null)
				throw new ArgumentNullException();

			_context.ProductName.Remove(productName);
			await _context.SaveChangesAsync();
		}

		#endregion

		#region Private property

		private AgroComplexDBContext _context = null;

		#endregion
	}
}
