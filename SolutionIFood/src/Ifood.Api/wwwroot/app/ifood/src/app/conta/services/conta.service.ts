import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

import { catchError, map } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class ContaService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    login(usuario: Usuario) {
        let response = this.http            
            .post(this.UrlServiceIfood, {}, this.ObterAuthHeaderJson(usuario))
            .pipe(
                map(this.extractDataLogin),
                catchError(this.serviceError));

        return response;
    }
}