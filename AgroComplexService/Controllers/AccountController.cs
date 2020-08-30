using AgroComplexService.Dto;
using AgroComplexService.Models.DataBase;
using AgroComplexService.Models.Services.AccountManagment;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AgroComplexService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : BaseController
    {
        public AccountController(AgroComplexDBContext context)
        {
            _accountServ = new AccountManagmentService(context);
        }

        [Route("Login")]
        [HttpPost]
        public async Task<LoginResponse> Login(LoginRequest request)
        {
            LoginResponse response = new LoginResponse();

            try
            {		
                Account account = await _accountServ.GetAccount(request.Email, request.Password); // exception

                if (account == null)
                    throw new ArgumentNullException();

                response.LiveTime = AuthOptions.LIFETIME.ToString();
                response.Token = _accountServ.GetToken(account);
            }
            catch (Exception ex)
            {
                SetResponse(response, ex);
            }

            return response;
        }

        private IAccountManagmentService _accountServ = null;
    }
}
