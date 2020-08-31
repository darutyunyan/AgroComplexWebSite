using AgroComplexService.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

		public async Task AddColumnType(ColumnType columnType)
		{
			if (columnType == null)
				throw new ArgumentNullException("columnType");

			await _context.ColumnTypes.AddAsync(columnType);
			await _context.SaveChangesAsync();
		}

		public async Task<List<ColumnType>> GetColumnTypes()
		{
			return await _context.ColumnTypes.ToListAsync();
		}

		public async Task RemovColumnType(Guid id)
		{
			if (id == Guid.Empty)
				throw new ArgumentException("id");


			ColumnType columnType = await _context
				.ColumnTypes
				.Where(c => c.Id == id)
				.FirstOrDefaultAsync();

			_context.ColumnTypes.Remove(columnType);
			await _context.SaveChangesAsync();
		}

		#endregion

		#region Private property

		private AgroComplexDBContext _context = null;

		#endregion
	}
}
