import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Entities/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IngresoService {
  private url: string = environment.api + '/usuarios';

  private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });

  //get-all
  constructor(private http: HttpClient) {}
  getIngresos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  //grabar
  create(ingreso: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.url, ingreso, {headers: this.httpHeaders})
  }

  //get-one
  getIngreso(id:undefined): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }

  //update
  update(ingreso: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.url}/${ingreso.id}`, ingreso, {headers: this.httpHeaders})
  }

  //delete
  delete(id:number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.url}/${id}`, {headers: this.httpHeaders})
  }
}
