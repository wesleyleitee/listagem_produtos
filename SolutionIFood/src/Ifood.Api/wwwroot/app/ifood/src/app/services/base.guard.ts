import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

export abstract class BaseGuard {

    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router) { }

    protected validarClaims(routeAc: ActivatedRouteSnapshot): boolean {
        if (this.localStorageUtils.obterTokenUsuario() == null) {
            this.router.navigate(['/acesso-negado']);
            return false;
        }
        return true;
    }
}