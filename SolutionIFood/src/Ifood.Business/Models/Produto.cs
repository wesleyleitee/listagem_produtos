namespace Ifood.Business.Models
{
    public class Produto : Entity
    {
        public string Nome { get; set; }        
        public decimal Valor { get; set; }
        public string Imagem { get; set; }
        
    }
}
