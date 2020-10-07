using AgroComplexService.Dto.ProductName;

namespace AgroComplexService.Dto.Client
{
	public class GetProductNamesByTypeResponse : Response
	{
		public ProductNameItem[] Items { get; set; }
	}
}
