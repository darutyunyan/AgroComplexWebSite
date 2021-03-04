using System.ComponentModel.DataAnnotations;

namespace AgroComplexService.Dto
{
	public class ShortFeedbackRequest
	{
		[Required]
		public string Name { get; set; }

		[Required]
		public string Phone { get; set; }

		public string Message { get; set; }
	}
}
