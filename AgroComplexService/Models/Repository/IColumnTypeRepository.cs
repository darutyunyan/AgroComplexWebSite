using AgroComplexService.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface IColumnTypeRepository
	{
		Task AddColumnType(ColumnType columbType);

		Task<List<ColumnType>> GetColumnTypes();

		Task RemovColumnType(Guid id);
	}
}
