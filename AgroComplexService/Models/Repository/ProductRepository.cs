using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
			if (product == null)
				throw new ArgumentNullException("product");

			await _context.Product.AddAsync(product);
			await _context.SaveChangesAsync();
		}

		public async Task Update(Product product)
		{
			if (product == null)
				throw new ArgumentNullException("product");

			_context.Update(product);
			await _context.SaveChangesAsync();
		}

		public async Task<Product> GetById(Guid id)
		{
			if (id == Guid.Empty)
				throw new ArgumentException("id");

			return await _context.Product
				.Where(p => p.Id == id)
				.FirstOrDefaultAsync();
		}

		public async Task<List<Product>> GetProductsByProductTypeId(Guid id)
		{
			if (id == Guid.Empty)
				throw new ArgumentException("id");

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
			if (id == Guid.Empty)
				throw new ArgumentException("id");


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
