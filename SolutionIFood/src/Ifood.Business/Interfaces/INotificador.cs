using Ifood.Business.Notificacoes;
using System.Collections.Generic;

namespace Ifood.Business.Interfaces
{
    public interface INotificador
    {
        bool TemNotificacao();
        List<Notificacao> ObterNotificacoes();
        void Handle(Notificacao notificacao);
    }
}
