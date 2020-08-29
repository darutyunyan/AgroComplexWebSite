using Microsoft.EntityFrameworkCore;

namespace AgroComplexService.Models.DataBase
{
	public class AgroComplexDBContext : DbContext
	{
		public DbSet<Account> Accounts { get; set; }

		public AgroComplexDBContext(DbContextOptions<AgroComplexDBContext> options)
			: base(options)
		{
		}
	}
}
