using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public class ProductRepository : IProductRepository
	{
		#region Constructor

		public ProductRepository(AgroComplexDBContext contect)
		{
			_context = contect;
		}

		#endregion

		#region Public methods

		public async Task Add(Product product)
		{
			Debug.Assert(product.Id != Guid.Empty);
			Debug.Assert(!string.IsNullOrEmpty(product.Info));
			Debug.Assert(product.ProductNameId != Guid.Empty);
			Debug.Assert(product.ColumnTypeId != Guid.Empty);

			await _context.Product.AddAsync(product);
			await _context.SaveChangesAsync();
		}

		public async Task Update(Product product)
		{
			Debug.Assert(product.Id != Guid.Empty);
			Debug.Assert(!string.IsNullOrEmpty(product.Info));
			Debug.Assert(product.ProductNameId != Guid.Empty);
			Debug.Assert(product.ColumnTypeId != Guid.Empty);

			_context.Update(product);
			await _context.SaveChangesAsync();
		}

		public async Task<Product> GetById(Guid id)
		{
			Debug.Assert(id != Guid.Empty);

			return await _context.Product
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();
		}

		public async Task<List<Product>> GetProductsByProductTypeId(Guid id)
		{
			Debug.Assert(id != Guid.Empty);

			return await _context.Product
				.Include(pN => pN.ProductName)
				.Include(cT => cT.ColumnType)
				.Where(p => p.ProductNameId == id)
				.ToListAsync();
		}

		public async Task<List<Product>> GetAll()
		{
			return await _context.Product
				.OrderBy(p => p.Info)
				.Include(pN=>pN.ProductName)
				.Include(cT=>cT.ColumnType)
				.Include(pT=>pT.ProductName.ProductType)
				.ToListAsync();
		}

		public async Task Remove(Guid id)
		{
			Debug.Assert(id != Guid.Empty);

			Product product = await _context
				.Product
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();

			if (product == null)
				throw new ArgumentNullException();

			_context.Product.Remove(product);
			await _context.SaveChangesAsync();
		}

		#endregion

		#region Private property

		private AgroComplexDBContext _context = null;

		#endregion
	}
}
