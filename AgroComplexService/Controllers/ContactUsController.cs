using AgroComplexService.Dto;
using AgroComplexService.Models.Services.Mail;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AgroComplexService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactUsController : BaseController
    {
        public ContactUsController(IMailService mailService)
        {
            _mailServ = mailService;
        }

        [Route("Feedback")]
        [HttpPost]
        public async Task<Response> Feedback(FeedbackRequest request)
        {
            Response response = new Response();

            try
            {
                await _mailServ.SendEmail(request.Name, request.Phone, request.Email, request.Message);
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
