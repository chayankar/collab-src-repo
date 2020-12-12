using collab_api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace collab_api.Middleware
{
    public class CookieToJWTBearerMiddleware
    {
        private readonly RequestDelegate _next;
        private const string authenticationCookieName = "AuthToken";

        public CookieToJWTBearerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var cookie = context.Request.Cookies[authenticationCookieName];
            if (cookie != null)
            {
                context.Request.Headers.Append("Authorization", "Bearer " + cookie);
            }

            await _next.Invoke(context);
        }
    }

    public static class JWTValidatorMiddlewareExtensions
    {
        public static IApplicationBuilder UseCookieToJWTBearerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CookieToJWTBearerMiddleware>();
        }
    }
}
