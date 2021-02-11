using Ifood.Business.Models;
using System;
using System.Threading.Tasks;

namespace Ifood.Business.Interfaces.Service
{
    public interface IProdutoService : IDisposable
    {
        Task<bool> Adicionar(Produto produto);
        Task<bool> Atualizar(Produto produto);
        Task<bool> Remover(Guid id);
    }
}
