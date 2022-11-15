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
    // create(ingreso: TerminalModel): Observable<TerminalModel>{
    //   return this.http.post<TerminalModel>(this.url, ingreso, {headers: this.httpHeaders})
    // }
  
    // //get-one
    // getOne(id:undefined): Observable<TerminalModel>{
    //   return this.http.get<TerminalModel>(`${this.url}/${id}`)
    // }
  
    // //update
    // update(ingreso: TerminalModel): Observable<TerminalModel>{
    //   return this.http.put<TerminalModel>(`${this.url}/${ingreso.codigo}`, ingreso, {headers: this.httpHeaders})
    // }
  
    // //delete
    // delete(id:number): Observable<TerminalModel>{
    //   return this.http.delete<TerminalModel>(`${this.url}/${id}`, {headers: this.httpHeaders})
    // }
  }