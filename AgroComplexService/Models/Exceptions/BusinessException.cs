using System;

namespace AgroComplexService.Models.Exceptions
{
	public class BusinessException : ArgumentException
	{
		public BusinessException(string message) : base(message) { }
	}
}
