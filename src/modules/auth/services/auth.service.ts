import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Funcionario } from '../models/funcionario.model';

@Injectable()
export class AuthService {
    apiPath: any = 'http://localhost:3001'
    constructor(private http : HttpClient) {}

    getAuth$(): Observable<{}> {
        return of({});
    }

    getLogin(funcionario:Funcionario
        ) : Observable<Funcionario> {
        return this.http.post<any>(`${this.apiPath}/login`, funcionario)
      }
}
