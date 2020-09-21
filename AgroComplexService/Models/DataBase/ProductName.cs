using System;

namespace AgroComplexService.Models.DataBase
{
    public class ProductName
    {
		public Guid Id { get; set; }
		public string Name { get; set; }

		public Guid ProductTypeId { get; set; }
		public ProductType ProductType { get; set; }
	}
}
