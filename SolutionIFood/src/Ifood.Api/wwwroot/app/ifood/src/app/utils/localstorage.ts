export class LocalStorageUtils {

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('ifood.user'));
    }

    public salvarDadosLocaisUsuario() {        
        this.salvarAuthUsuario();
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('ifood.logado');        
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('ifood.logado');
    }

    public salvarAuthUsuario() {
        localStorage.setItem('ifood.logado', JSON.stringify(true));        
    }    

}