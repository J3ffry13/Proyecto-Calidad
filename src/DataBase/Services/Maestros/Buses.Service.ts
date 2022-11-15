import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BusesModel } from 'src/DataBase/Entities/Maestros/Buses.model';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class BusesService {
    
    private base = environment.api
    private url: string = this.base + 'buses/';
  
    private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });
  
    //get-all
    constructor(private http: HttpClient) {}
    getAll(): Observable<BusesModel[]> {
      return this.http.get<BusesModel[]>(this.url + 'consultar?patron=');
    }
  
    // //grabar
    // create(ingreso: BusesModel): Observable<BusesModel>{
    //   return this.http.post<BusesModel>(this.url, ingreso, {headers: this.httpHeaders})
    // }
  
    // //get-one
    // getOne(id:undefined): Observable<BusesModel>{
    //   return this.http.get<BusesModel>(`${this.url}/${id}`)
    // }
  
    // //update
    // update(ingreso: BusesModel): Observable<BusesModel>{
    //   return this.http.put<BusesModel>(`${this.url}/${ingreso.codigo}`, ingreso, {headers: this.httpHeaders})
    // }
  
    // //delete
    // delete(id:number): Observable<BusesModel>{
    //   return this.http.delete<BusesModel>(`${this.url}/${id}`, {headers: this.httpHeaders})
    // }
  }