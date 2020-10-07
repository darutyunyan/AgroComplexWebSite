namespace AgroComplexService.Dto.Client
{
	public class GetFirstProductByTypeResponse : Response
	{
		public string ProductName { get; set; }

		public string[] ColumnNames { get; set; }

		public string[][] Info { get; set; }
	}
}
