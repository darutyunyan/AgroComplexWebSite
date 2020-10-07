using AgroComplexService.Dto.ProductName;

namespace AgroComplexService.Dto.Client
{
	public class InitHomePageResponse : Response
	{
		public ProductNameItem[] Seeds { get; set; }

		public ProductNameItem[] PlanProtectionProducts { get; set; }
	}
}
