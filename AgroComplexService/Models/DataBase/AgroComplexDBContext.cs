using Microsoft.EntityFrameworkCore;

namespace AgroComplexService.Models.DataBase
{
	public partial class AgroComplexDBContext : DbContext
	{
		public AgroComplexDBContext(DbContextOptions<AgroComplexDBContext> options)
			: base(options)
		{
		}

		public virtual DbSet<Account> Account { get; set; }
		public virtual DbSet<Product> Product { get; set; }
		public virtual DbSet<ProductName> ProductName { get; set; }
		public virtual DbSet<ProductType> ProductType { get; set; }
		public virtual DbSet<ColumnType> ColumnType { get; set; }
		public virtual DbSet<Location> Location { get; set; }
		public virtual DbSet<Log> Log { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Account>(entity =>
			{
				entity.Property(e => e.Id).ValueGeneratedNever();

				entity.Property(e => e.Email)
					.IsRequired()
					.HasMaxLength(120);

				entity.Property(e => e.Password)
					.IsRequired()
					.HasMaxLength(120);
			});

			OnModelCreatingPartial(modelBuilder);
		}

		partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
	}
}
