using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.ProductName;
using AgroComplexService.Dto.ProductType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgroComplexService.Dto.Product
{
	public class InitAddProductResponse : Response
	{
		public ProductTypeItem[] ProductTypes { get; set; }

		public ProductNameItem[] ProductNames { get; set; }

		public ColumnTypeItem[] ColumnTypes { get; set; }
	}
}
