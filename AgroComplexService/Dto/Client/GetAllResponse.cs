using AgroComplexService.Dto.ProductName;

namespace AgroComplexService.Dto.Client
{
	public class GetAllResponse : Response
	{
		public GetAllItem[] Items { get; set; }
	}
}
