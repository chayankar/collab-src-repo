using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using collab_api.Model;
using collab_api.Middleware;
using collab_api.Model;
using collab_api.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace collab_api
{
    public class Startup
    {
        private IConfiguration Configuration { get; }
        private IWebHostEnvironment appHostEnv;

        private string corsPolicy = "allowSpecificOrigin";

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            appHostEnv = env;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            InitCORSSetting(services);

            ConfigureJWTAuthMiddleware(services);

            // InitCookieSettings(services);

            LoadAppConfig(services);

            InitDIContainer(services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(corsPolicy);

            app.UseCookieToJWTBearerMiddleware();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureJWTAuthMiddleware(IServiceCollection services)
        {
            IConfigurationSection configSection = Configuration.GetSection("JWTAuthConfig");

            string jwtSecurityKey = configSection.GetValue<string>("JWTSecretKey");
            string issuer = configSection.GetValue<string>("Issuer");
            string audience = configSection.GetValue<string>("Audience");

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecurityKey))
                };
            });
        }

        private void InitCORSSetting(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: corsPolicy, builder =>
                {
                    builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                });
            });
        }

        private void InitCookieSettings(IServiceCollection services)
        {
            string jwtSecurityKey = Configuration.GetSection("JWTAuthConfig").GetValue<string>("JWTSecretKey");
            TokenValidationParameters tokenValidateParam = new TokenValidationParameters()
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecurityKey)),

                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = "collab-api",

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = "collab-api-user",

                // Validate the token expiry
                ValidateLifetime = true,

                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, x =>
            {
                x.Cookie.HttpOnly = false;
                x.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                x.Cookie.SameSite = SameSiteMode.None;
                // x.TicketDataFormat = new JWTValidator(SecurityAlgorithms.HmacSha256, tokenValidateParam);
                x.Cookie.Name = "AuthCookie";
            });
        }

        private void LoadAppConfig(IServiceCollection services)
        {
            var configSection = Configuration.GetSection("JWTAuthConfig");
            services.Configure<JWTAuthConfig>(configSection);
        }

        private void InitDIContainer(IServiceCollection services)
        {
            services.AddScoped<IUserAuthenticationService, Services.AuthenticationService>();
            services.AddScoped<IEncryptionService, AESEncyption>();
            services.AddScoped<ISecurityTokenService, JWTService>();
        }
    }
}
