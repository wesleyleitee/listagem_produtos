import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../services/produto.service';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ProdutoBaseComponent } from '../produto-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ProdutoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imagens: string = environment.imagensUrl;
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  apiRetornou: boolean;

  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    super();
    this.produto = this.route.snapshot.data['produto'];
  }

  ngOnInit(): void {
    this.produtoForm = this.fb.group({      
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],      
      imagem: [''],
      valor: ['', [Validators.required]]      
    });

    this.produtoForm.patchValue({      
      id: this.produto.id,
      nome: this.produto.nome,     
      valor: CurrencyUtils.DecimalParaString(this.produto.valor)
    });

    // utilizar o [src] na imagem para evitar que se perca após post
    this.imagemOriginalSrc = this.imagens + this.produto.imagem;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarProduto() {    
    this.apiRetornou = false;
    debugger;
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);

      if (this.imageBase64) {
        this.produto.imagemUpload = this.imageBase64;
        this.produto.imagem = this.imagemNome;
      }

      this.produto.valor = CurrencyUtils.StringParaDecimal(this.produto.valor);
      this.produtoService.atualizarProduto(this.produto)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.produtoForm.reset();
    this.errors = [];
    let toast = this.toastr.success('Produto editado com sucesso!', 'Sucesso!');
    if (toast) { this.router.navigate(['/produtos/listar-todos']);}
    this.apiRetornou = true;
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
    this.apiRetornou = true;
  }

  upload(file: any) {
    this.imagemNome = file[0].name;
    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
    this.imagemPreview = "data:image/jpeg;base64," + this.imageBase64;
  }
}

