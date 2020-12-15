using System;
using Microsoft.AspNetCore.Mvc;
using AgroComplexService.Dto;
using AgroComplexService.Models.Exceptions;

namespace AgroComplexService.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class BaseController : ControllerBase
	{
		[HttpGet]
		public string Get()
		{
			return "Service work!";
		}

		#region Protected Methods

		protected void SetResponse(Response response, Exception exception)
		{
			if (exception is BusinessException)
			{
				response.Error = new Error(ERROR_BUSINESS, exception.Message);
			}
			else
			{
				response.Error = new Error(ERROR_COMMON, SERVICE_ERROR_MESSAGE);
			}
		}

		#endregion

		#region Private constants

		private const string ERROR_COMMON = "ABBCC1121";

		private const string ERROR_BUSINESS = "ABBC1122";

		private const string SERVICE_ERROR_MESSAGE = "asdasd";
		#endregion
	}
}
