using AgroComplexService.Models.DataBase;
using AgroComplexService.Models.Repository;
using System;

namespace AgroComplexService.Models
{
	public class LogHelper
	{
		#region Constructor

		public LogHelper(AgroComplexDBContext context)
		{
			this._logRepo = new LogRepository(context);
		}

		#endregion

		#region Public methods

		public void LogError(Exception ex)
		{
			Log log = new Log()
			{
				Id = Guid.NewGuid(),
				ErrorType = ERRROR_TYPE,
				Date = DateTime.UtcNow,
				Message = ex.Message,
				StackTrace = ex.StackTrace
			};

			_logRepo.Add(log);
		}

		#endregion


		#region Private constant

		private const string ERRROR_TYPE = "Error";

		#endregion

		#region Private property

		private ILogRepository _logRepo = null;

		#endregion
	}
}
