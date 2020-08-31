using AgroComplexService.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Repository
{
	public interface IColumnTypeRepository
	{
		Task Add(ColumnType columbType);

		Task<List<ColumnType>> GetAll();

		Task Remove(Guid id);
	}
}
