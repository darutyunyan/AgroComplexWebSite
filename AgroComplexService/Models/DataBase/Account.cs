using System;

namespace AgroComplexService.Models.DataBase
{
	public class Account
	{
		public Guid Id { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
	}
}
