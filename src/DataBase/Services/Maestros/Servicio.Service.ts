import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServicioModel } from 'src/DataBase/Entities/Maestros/Servicio.model';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class ServicioService {
    
    private base = environment.api
    private url: string = this.base + 'servicios/';
  
    private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });
  
    //get-all
    constructor(private http: HttpClient) {}
    getAll(): Observable<ServicioModel[]> {
      return this.http.get<ServicioModel[]>(this.url + 'consultar?patron=');
    }
  
    // //grabar
    // create(ingreso: ServicioModel): Observable<ServicioModel>{
    //   return this.http.post<ServicioModel>(this.url, ingreso, {headers: this.httpHeaders})
    // }
  
    // //get-one
    // getOne(id:undefined): Observable<ServicioModel>{
    //   return this.http.get<ServicioModel>(`${this.url}/${id}`)
    // }
  
    // //update
    // update(ingreso: ServicioModel): Observable<ServicioModel>{
    //   return this.http.put<ServicioModel>(`${this.url}/${ingreso.codigo}`, ingreso, {headers: this.httpHeaders})
    // }
  
    // //delete
    // delete(id:number): Observable<ServicioModel>{
    //   return this.http.delete<ServicioModel>(`${this.url}/${id}`, {headers: this.httpHeaders})
    // }
  }