using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace Ifood.Api.ViewModels
{
    public class ProdutoImagemViewModel
    {
        [Key]
        public Guid Id { get; set; }        

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(200, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public decimal Valor { get; set; }

        public IFormFile ImagemUpload { get; set; }

        public string Imagem { get; set; }
    }
}
