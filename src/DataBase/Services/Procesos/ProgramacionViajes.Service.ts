import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProgViajeModel } from 'src/DataBase/Entities/Procesos/ProgViaje.model';

@Injectable({
    providedIn: 'root',
  })
  export class ProgViajesService {
    
    private base = environment.api
    private url: string = this.base + 'viajes/';
  
    private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });
  
    //get-all
    constructor(private http: HttpClient) {}
    getAll(): Observable<ProgViajeModel[]> {
      return this.http.get<ProgViajeModel[]>(this.url+'consultar?patron=');
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