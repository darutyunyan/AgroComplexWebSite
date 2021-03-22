using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public class ColumnTypeRepository : IColumnTypeRepository
	{
		#region Constructor

		public ColumnTypeRepository(AgroComplexDBContext contect)
		{
			_context = contect;
		}

		#endregion

		#region Public methods

		public async Task Add(ColumnType columnType)
		{
			Debug.Assert(columnType.Id != Guid.Empty);
			Debug.Assert(!string.IsNullOrEmpty(columnType.Name));

			await _context.ColumnType.AddAsync(columnType);
			await _context.SaveChangesAsync();
		}

		public async Task<List<ColumnType>> GetAll()
		{
			return await _context.ColumnType.OrderBy(c => c.Name).ToListAsync();
		}

		public async Task<bool> IsExist(string name)
		{
			Debug.Assert(!string.IsNullOrEmpty(name));

			return await _context.ColumnType.AnyAsync(p => p.Name.ToLower() == name.ToLower());
		}

		public async Task Remove(Guid id)
		{
			Debug.Assert(id != Guid.Empty);

			ColumnType columnType = await _context
				.ColumnType
				.Where(c => c.Id == id)
				.FirstOrDefaultAsync();

			if (columnType == null)
				throw new ArgumentNullException();

			_context.ColumnType.Remove(columnType);
			await _context.SaveChangesAsync();
		}

		#endregion

		#region Private property

		private AgroComplexDBContext _context = null;

		#endregion
	}
}
