import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CiudadModel } from 'src/DataBase/Entities/Maestros/Ciudad.model';

@Injectable({
    providedIn: 'root',
  })
  export class CiudadService {
    
    private base = environment.api
    private url: string = this.base + 'ciudades/';
  
    private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });
  
    //get-all
    constructor(private http: HttpClient) {}

  //   getAll = async () => {
  //     const servicioGeneral = this.http.get<CiudadModel[]>(this.url+'consultar?patron=');
  //    // return await this.http.get<RutaModel[]>(this.url+'consultarT?patron=');
  //    return await servicioGeneral;
  //  };

    getAll(): Observable<CiudadModel[]> {
      return this.http.get<CiudadModel[]>(this.url+'consultar?patron=');
    }
  
    //grabar
    // create(ingreso: RutaModel): Observable<RutaModel>{
    //   return this.http.post<RutaModel>(this.url, ingreso, {headers: this.httpHeaders})
    // }
  
    //get-one
    // getOne(id:undefined): Observable<RutaModel>{
    //   return this.http.get<RutaModel>(`${this.url}/${id}`)
    // }
  
    // //update
    // update(ingreso: RutaModel): Observable<RutaModel>{
    //   return this.http.put<RutaModel>(`${this.url}/${ingreso.codigo}`, ingreso, {headers: this.httpHeaders})
    // }
  
    // //delete
    // delete(id:number): Observable<RutaModel>{
    //   return this.http.delete<RutaModel>(`${this.url}/${id}`, {headers: this.httpHeaders})
    // }
  }
  