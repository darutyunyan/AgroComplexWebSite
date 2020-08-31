using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Models.DataBase
{
	public class Product
	{
		public Guid Id { get; set; }
		public string Info { get; set; }

		public int ProductTypeId { get; set; }
		public ProductType ProductType { get; set; }

		public int ProductNameId { get; set; }
		public ProductName ProductName { get; set; }

		public int ColumnTypeId { get; set; }
		public ColumnType ColumnType { get; set; }

	}
}
