using Ifood.Business.Interfaces;
using Ifood.Business.Interfaces.Repository;
using Ifood.Business.Interfaces.Service;
using Ifood.Business.Notificacoes;
using Ifood.Business.Services;
using Ifood.Data.Context;
using Ifood.Data.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Ifood.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<MeuDbContext>();

            // Repository
            services.AddScoped<IProdutoRepository, ProdutoRepository>();
           
            // Service
            services.AddScoped<INotificador, Notificador>();            
            services.AddScoped<IProdutoService, ProdutoService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();            

            return services;
        }
    }
}
