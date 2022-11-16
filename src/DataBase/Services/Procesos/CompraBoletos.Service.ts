import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VentBoletosModel } from 'src/DataBase/Entities/Procesos/VentBoletos.model';

@Injectable({
    providedIn: 'root',
  })
  export class CompraBoletosService {
    
    private base = environment.api
    private url: string = this.base + 'tickets/';
  
    private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });
  
    //get-all
    constructor(private http: HttpClient) {}
    getAll(): Observable<VentBoletosModel[]> {
      return this.http.get<VentBoletosModel[]>(this.url+'consultar?viaje_id=');
    }
  
    // //grabar
    create(ingreso: any):Observable<any>{
      console.log(ingreso);
      return this.http.post<any>(this.url+'registrar', ingreso, {headers: this.httpHeaders})
    }
  
    // //update
    update(ingreso: any): Observable<any>{
      console.log(ingreso);
      return this.http.put<any>(this.url+'modificar', ingreso, {headers: this.httpHeaders})
    }
  
    // //delete
    // delete(id:number): Observable<TerminalModel>{
    //   return this.http.delete<TerminalModel>(`${this.url}/${id}`, {headers: this.httpHeaders})
    // }
  }