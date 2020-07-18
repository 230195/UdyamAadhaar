using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using BusinessLogic.StartupMethods;
using Microsoft.IdentityModel.Tokens;
using Data.DBContext;
using Data.DBTables;
using BusinessLogic.Constants;

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Initialize EfCore With sql server
            services.AddCors(options =>
            {
                options.AddPolicy(ConfigurationConstant.CorsOrginName,
                builder => {
                    builder.WithOrigins(Configuration[ConfigurationConstant.Url.CorsUrl])
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            services.AddDbContext<ProjectContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString(ConfigurationConstant.ConnectionString.AadharDb));
            });

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = ConfigurationConstant.User.RequireDigit;
                options.Password.RequiredLength = ConfigurationConstant.User.RequiredLength;
            }).AddEntityFrameworkStores<ProjectContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                   ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration[ConfigurationConstant.User.JwtAudience],
                    ValidIssuer = Configuration[ConfigurationConstant.User.JwtIssuer],
                    RequireExpirationTime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration[ConfigurationConstant.User.JwtKey])),
                    ValidateIssuerSigningKey = true
                };
            });

            StartupHelper.InjectDependency(services);
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            //Serilog.Extensions.Logging.File
            //Add file is extension method from Serilog Package....
            string filePath = Configuration[ConfigurationConstant.Logger.FilePath];//To-Do Change the string and put it in config files
            loggerFactory.AddFile(filePath);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(
                        Path.Combine(Configuration[ConfigurationConstant.Url.ThumbnailUrl])),
                RequestPath = new PathString("/api")
            });

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
