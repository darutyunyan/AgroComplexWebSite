using AgroComplexService.Dto;
using System.Threading.Tasks;

namespace AgroComplexService.Models.Services.Mail
{
    public interface IMailService
    {
        Task SendEmail(FeedbackRequest request);

		Task SendShortEmail(ShortFeedbackRequest request);
	}
}
