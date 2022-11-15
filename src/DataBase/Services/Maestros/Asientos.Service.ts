import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AsientosModel } from 'src/DataBase/Entities/Maestros/Asientos.model';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class AsientosService {
    
    private base = environment.api
    private url: string = this.base + 'asientos/';
  
    private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });
  
    //get-all
    constructor(private http: HttpClient) {}
    getAll(): Observable<AsientosModel[]> {
      return this.http.get<AsientosModel[]>(this.url + 'consultar?patron=');
    }
  
    // //grabar
    // create(ingreso: AsientosModel): Observable<AsientosModel>{
    //   return this.http.post<AsientosModel>(this.url, ingreso, {headers: this.httpHeaders})
    // }
  
    // //get-one
    // getOne(id:undefined): Observable<AsientosModel>{
    //   return this.http.get<AsientosModel>(`${this.url}/${id}`)
    // }
  
    // //update
    // update(ingreso: AsientosModel): Observable<AsientosModel>{
    //   return this.http.put<AsientosModel>(`${this.url}/${ingreso.codigo}`, ingreso, {headers: this.httpHeaders})
    // }
  
    // //delete
    // delete(id:number): Observable<AsientosModel>{
    //   return this.http.delete<AsientosModel>(`${this.url}/${id}`, {headers: this.httpHeaders})
    // }
  }