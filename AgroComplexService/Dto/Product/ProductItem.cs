using System;

namespace AgroComplexService.Dto.Product
{
	public class ProductItem
	{
		public Guid Id { get; set; }

		public string Info { get; set; }

		public string ProductType { get; set; }

		public string ProductName { get; set; }

		public string ColumnType { get; set; }
	}
}
