import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from 'src/environments/environment';
import { Usuario } from "../conta/models/usuario";
import { LocalStorageUtils } from '../utils/localstorage';

export abstract class BaseService {

    protected UrlServiceV1: string = environment.apiUrlv1;
    protected UrlServiceIfood: string = environment.apiUrlIfood;

    public LocalStorage = new LocalStorageUtils();

    protected ObterAuthHeaderJson(usuario: Usuario) {   
        let auth = btoa(usuario.username + ':' + usuario.password);
        return  {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + auth
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected extractDataLogin(response: any) {
        return response || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse = { error: { errors: [] }}

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }
        if (response.status === 500) {
            customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.");
            
            // Erros do tipo 500 não possuem uma lista de erros
            // A lista de erros do HttpErrorResponse é readonly                
            customResponse.error.errors = customError;
            return throwError(customResponse);
        }

        console.error(response);
        return throwError(response);
    }
}