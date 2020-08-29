using System.Threading.Tasks;

namespace AgroComplexService.Models.Services.Mail
{
    public interface IMailService
    {
        Task SendEmail(string name, string phone, string email, string message);
    }
}
