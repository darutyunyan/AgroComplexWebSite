using System;

namespace AgroComplexService.Models.DataBase
{
	public class Log
	{
		public Guid Id { get; set; }
		public string ErrorType { get; set; }
		public DateTime Date { get; set; }
		public string Message { get; set; }
		public string StackTrace { get; set; }
	}
}
