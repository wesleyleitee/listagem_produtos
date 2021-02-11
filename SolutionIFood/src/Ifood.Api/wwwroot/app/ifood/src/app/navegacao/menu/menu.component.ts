import { Component } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  public isCollapsed: boolean;
  public LocalStorage = new LocalStorageUtils();

  constructor() {
    this.isCollapsed = true;
  }

  usuarioLogado(){
    var logado = this.LocalStorage.obterTokenUsuario();
    if(logado == null){
      return false
    }
    return true;
  }
}
