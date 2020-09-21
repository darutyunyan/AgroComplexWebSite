using AgroComplexService.Dto.ColumnType;
using AgroComplexService.Dto.ProductName;

namespace AgroComplexService.Dto.Product
{
	public class InitAddProductResponse : Response
	{
		public ProductNameItem[] ProductNames { get; set; }

		public ColumnTypeItem[] ColumnTypes { get; set; }
	}
}
