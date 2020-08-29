using AgroComplexService.Dto;
using System;
using Microsoft.AspNetCore.Mvc;

namespace TeacherService.Controllers
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
			response.ServiceError = new ServiceError(ERROR_CODE, exception.Message);
		}

		#endregion

		#region Private constants

		private const int ERROR_CODE = 12355;

		#endregion
	}
}
