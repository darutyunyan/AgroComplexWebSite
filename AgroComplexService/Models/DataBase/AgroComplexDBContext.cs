using Microsoft.EntityFrameworkCore;

namespace AgroComplexService.Models.DataBase
{
	public class AgroComplexDBContext : DbContext
	{
		public virtual DbSet<Account> Accounts { get; set; }
		public virtual DbSet<Product> Products { get; set; }
		public virtual DbSet<ProductType> ProductTypes { get; set; }
		public virtual DbSet<ColumnType> ColumnTypes { get; set; }


		public AgroComplexDBContext(DbContextOptions<AgroComplexDBContext> options)
			: base(options)
		{
		}
	}
}
