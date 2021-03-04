using AgroComplexService.Dto;
using AgroComplexService.Models.Exceptions;
using System;
using Microsoft.AspNetCore.Mvc;
using AgroComplexService.Models.DataBase;
using AgroComplexService.Models;

namespace AgroComplexService.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class BaseController : ControllerBase
	{
		#region Constructor

		public BaseController(AgroComplexDBContext context)
		{
			this._logHelper = new LogHelper(context);
		}

		#endregion

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

			_logHelper.LogError(exception);
		}

		#endregion

		#region Private constants

		private const string ERROR_COMMON = "ABBCC1121";

		private const string ERROR_BUSINESS = "ABBC1122";

		private const string SERVICE_ERROR_MESSAGE = "Server Error!";

		#endregion

		#region Private property

		private LogHelper _logHelper = null;

		#endregion
	}
}
