using System.ComponentModel.DataAnnotations;

namespace AgroComplexService.Dto
{
    public class FeedbackRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Phone { get; set; }

        public string Email { get; set; }

		[Required]
		public string ProductPosition { get; set; }
    }
}
