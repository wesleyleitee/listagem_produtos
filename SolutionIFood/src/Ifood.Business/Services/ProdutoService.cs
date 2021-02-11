using Ifood.Business.Interfaces;
using Ifood.Business.Interfaces.Repository;
using Ifood.Business.Interfaces.Service;
using Ifood.Business.Models;
using Ifood.Business.Models.Validations;
using System;
using System.Threading.Tasks;

namespace Ifood.Business.Services
{
    public class ProdutoService : BaseService, IProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;        

        public ProdutoService(IProdutoRepository produtoRepository,
                              INotificador notificador                              
            ) : base(notificador)
        {
            _produtoRepository = produtoRepository;            
        }

        public async Task<bool> Adicionar(Produto produto)
        {
            if (!ExecutarValidacao(new ProdutoValidation(), produto)) return false;
            await _produtoRepository.Adicionar(produto);
            return true;
        }

        public async Task<bool> Atualizar(Produto produto)
        {
            if (!ExecutarValidacao(new ProdutoValidation(), produto)) return false;

            await _produtoRepository.Atualizar(produto);
            return true;
        }

        public async Task<bool> Remover(Guid id)
        {
            await _produtoRepository.Remover(id);
            return true;
        }

        public void Dispose()
        {
            _produtoRepository?.Dispose();
        }
    }
}
