using AgroComplexService.Models.DataBase;
using AgroComplexService.Models.Services.AccountManagment;
using AgroComplexService.Models.Services.Mail;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;

namespace AgroComplexService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
		private readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

		public void ConfigureServices(IServiceCollection services)
        {
			// Sql server.
			services.AddDbContext<AgroComplexDBContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("AgroComplexDb")));

			// Resourse file.
			services.AddLocalization(options => options.ResourcesPath = "Resources");

			// Init Mail service.
			EmailSetting settings = new EmailSetting();
			Configuration.GetSection("AppSettings:EmailSetting").Bind(settings);
			services.AddTransient<IMailService>(x => new MailService(settings));

			// Init Cors service.
			string clientUrl = Configuration.GetValue<string>("AppSettings:ClientUrl:Url");
			services.AddCors(options =>
			{
				options.AddPolicy(name: MyAllowSpecificOrigins, builder => builder
					.WithOrigins(clientUrl)
					.AllowAnyHeader()
					.AllowAnyMethod());
			});

			// Init Authentication token.
			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
			{
				options.RequireHttpsMetadata = true;
				options.RequireHttpsMetadata = true;
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,

					ValidIssuer = AuthOptions.ISSUER,

					ValidateAudience = true,

					ValidAudience = AuthOptions.AUDIENCE,

					ValidateLifetime = true,

					IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),

					ValidateIssuerSigningKey = true,
				};
			});

			services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

			app.UseCors(MyAllowSpecificOrigins);

			app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
