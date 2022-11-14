import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RutaModel } from 'src/DataBase/Entities/Maestros/Ruta.model';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class RutaService {
    
    private base = environment.api
    private url: string = this.base + '/rutas';
  
    private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });
  
    //get-all
    constructor(private http: HttpClient) {}
    getAll(): Observable<RutaModel[]> {
      return this.http.get<RutaModel[]>(this.url);
    }
  
    //grabar
    create(ingreso: RutaModel): Observable<RutaModel>{
      return this.http.post<RutaModel>(this.url, ingreso, {headers: this.httpHeaders})
    }
  
    //get-one
    getOne(id:undefined): Observable<RutaModel>{
      return this.http.get<RutaModel>(`${this.url}/${id}`)
    }
  
    //update
    update(ingreso: RutaModel): Observable<RutaModel>{
      return this.http.put<RutaModel>(`${this.url}/${ingreso.codigo}`, ingreso, {headers: this.httpHeaders})
    }
  
    //delete
    delete(id:number): Observable<RutaModel>{
      return this.http.delete<RutaModel>(`${this.url}/${id}`, {headers: this.httpHeaders})
    }
  }
  