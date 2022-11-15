import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../../Entities/Maestros/Usuario';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = environment.api + 'usuarios/';

  private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });

  //get-all
  constructor(private http: HttpClient) {}
  getAll(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(this.url+'consultar?patron=');
  }

  //grabar
  create(ingreso: UsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(this.url, ingreso, {headers: this.httpHeaders})
  }

  //get-one
  getIngreso(id:undefined): Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`${this.url}/${id}`)
  }

  //update
  // update(ingreso: Usuario): Observable<Usuario>{
  //   return this.http.put<Usuario>(`${this.url}/${ingreso.id}`, ingreso, {headers: this.httpHeaders})
  // }

  //delete
  delete(id:number): Observable<UsuarioModel>{
    return this.http.delete<UsuarioModel>(`${this.url}/${id}`, {headers: this.httpHeaders})
  }
}
