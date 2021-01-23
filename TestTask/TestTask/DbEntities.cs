using Microsoft.EntityFrameworkCore;
using TestTask.Models;

namespace TestTaskWebApp1
{
	public class DbEntities : DbContext
	{
		public static readonly string connectionstring = "Data Source=(LocalDb)\\MSSQLLocalDB;Initial Catalog= CSVDb;";

        public DbSet<CSV> CSVs { get; set; }
        public DbEntities(DbContextOptions<DbEntities> options) : base(options)
        {
            Database.EnsureCreated();
            _options = options;
        }
        public DbContextOptions<DbEntities> _options;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionstring);
        }

    }
}
