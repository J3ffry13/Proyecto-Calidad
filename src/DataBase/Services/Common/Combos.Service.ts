import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Combos } from 'src/DataBase/Entities/Common/Combos';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IngresoService {
  private url: string = environment.api + '/Combos';

  private httpHeaders = new HttpHeaders({ 'content-Type': 'application/json' });

  //get-all
  constructor(private http: HttpClient) {}
  getIngreso(id:undefined): Observable<Combos>{
    return this.http.get<Combos>(`${this.url}/${id}`)
  }

}
