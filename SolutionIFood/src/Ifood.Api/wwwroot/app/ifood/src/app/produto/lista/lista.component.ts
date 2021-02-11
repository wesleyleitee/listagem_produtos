import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;
  public produtos: Produto[];
  errorMessage: string;
  apiRetornou: boolean;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.apiRetornou = false;
    this.produtoService.obterTodos()
      .subscribe(
        produtos => {
          this.produtos = produtos;
          this.apiRetornou = true;
        },
        error => {
          this.errorMessage;
          this.apiRetornou = true;
        });
  }
}
