using AgroComplexService.Dto;
using AgroComplexService.Models.Services.Mail;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using AgroComplexService.Models.DataBase;

namespace AgroComplexService.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class ContactUsController : BaseController
	{
		public ContactUsController(IOptions<EmailSetting> op, IStringLocalizer<Resource> localizer, AgroComplexDBContext context) : base (context)
		{
			_mailServ = new MailService(op.Value, localizer);
		}

		[Route("Feedback")]
		[HttpPost]
		public async Task<Response> Feedback(FeedbackRequest request)
		{
			Response response = new Response();

			try
			{
				await _mailServ.SendEmail(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		[Route("ShortFeedback")]
		[HttpPost]
		public async Task<Response> ShortFeedback(ShortFeedbackRequest request)
		{
			Response response = new Response();

			try
			{
				await _mailServ.SendShortEmail(request);
			}
			catch (Exception ex)
			{
				SetResponse(response, ex);
			}

			return response;
		}

		private IMailService _mailServ = null;
	}
}
