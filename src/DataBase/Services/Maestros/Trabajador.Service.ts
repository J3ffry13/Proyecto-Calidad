import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TrabajadorModel } from 'src/DataBase/Entities/Maestros/Trabajador.model';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class TrabajadorService {
    
    private base = environment.api
    private url: string = this.base + '/rutas';
  
    private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });
  
    //get-all
    constructor(private http: HttpClient) {}
    getAll(): Observable<TrabajadorModel[]> {
      return this.http.get<TrabajadorModel[]>(this.url);
    }
  
    //grabar
    create(ingreso: TrabajadorModel): Observable<TrabajadorModel>{
      return this.http.post<TrabajadorModel>(this.url, ingreso, {headers: this.httpHeaders})
    }
  
    //get-one
    getOne(id:undefined): Observable<TrabajadorModel>{
      return this.http.get<TrabajadorModel>(`${this.url}/${id}`)
    }
  
    //update
    update(ingreso: TrabajadorModel): Observable<TrabajadorModel>{
      return this.http.put<TrabajadorModel>(`${this.url}/${ingreso.codigo}`, ingreso, {headers: this.httpHeaders})
    }
  
    //delete
    delete(id:number): Observable<TrabajadorModel>{
      return this.http.delete<TrabajadorModel>(`${this.url}/${id}`, {headers: this.httpHeaders})
    }
  }