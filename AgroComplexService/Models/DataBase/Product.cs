using System;

namespace AgroComplexService.Models.DataBase
{
	public class Product
	{
		public Guid Id { get; set; }
		public string Info { get; set; }

		public Guid ProductTypeId { get; set; }
		public ProductType ProductType { get; set; }

		public Guid ProductNameId { get; set; }
		public ProductName ProductName { get; set; }

		public Guid ColumnTypeId { get; set; }
		public ColumnType ColumnType { get; set; }
	}
}
