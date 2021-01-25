using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using AgroComplexService.Dto;

namespace AgroComplexService.Models.Services.Mail
{
    public class MailService : IMailService
    {
        public MailService(EmailSetting settings, IStringLocalizer<Resource> resource)
        {
            _settings = settings;
			_resource = resource;
        }

        public async Task SendEmail(FeedbackRequest request)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(_settings.SenderName, _settings.EmailFrom));
            emailMessage.To.Add(new MailboxAddress(string.Empty, _settings.EmailTo));
            emailMessage.Subject = _resource["ContactUs_FeedbackSubject"];
			emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = string.Format(_resource["ContactUs_FeedbackMessage"], request.Name, request.Phone, request.Email, request.ProductPosition)
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_settings.SmtpClient, _settings.Port, true);
                await client.AuthenticateAsync(_settings.EmailFrom, _settings.PasswordFrom);
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }

		public async Task SendShortEmail(ShortFeedbackRequest request)
		{
			var emailMessage = new MimeMessage();

			emailMessage.From.Add(new MailboxAddress(_settings.SenderName, _settings.EmailFrom));
			emailMessage.To.Add(new MailboxAddress(string.Empty, _settings.EmailTo));
			emailMessage.Subject = _resource["ContactUs_ShortFeedbackSubject"];
			emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
			{
				Text = string.Format(_resource["ContactUs_ShortFeedbackSubject"], request.Name, request.Phone, request.Message)
			};

			using (var client = new SmtpClient())
			{
				await client.ConnectAsync(_settings.SmtpClient, _settings.Port, true);
				await client.AuthenticateAsync(_settings.EmailFrom, _settings.PasswordFrom);
				await client.SendAsync(emailMessage);

				await client.DisconnectAsync(true);
			}
		}

		#region Private property

		private EmailSetting _settings = null;

		private readonly IStringLocalizer<Resource> _resource = null;

		#endregion
	}
}
