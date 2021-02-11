using AutoMapper;
using Ifood.Api.ViewModels;
using Ifood.Business.Models;

namespace Ifood.Api.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {            
            CreateMap<ProdutoViewModel, Produto>().ReverseMap();
            CreateMap<ProdutoImagemViewModel, Produto>().ReverseMap();
        }
    }
}
