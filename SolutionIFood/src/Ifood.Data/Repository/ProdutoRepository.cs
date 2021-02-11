using Ifood.Business.Interfaces.Repository;
using Ifood.Business.Models;
using Ifood.Data.Context;

namespace Ifood.Data.Repository
{
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository
    {
        public ProdutoRepository(MeuDbContext context) : base(context) { }     

    }
}
