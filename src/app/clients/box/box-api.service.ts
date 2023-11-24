import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Box } from './models/box';

@Injectable({
  providedIn: 'root'
})
export class BoxApiService extends Api {

  constructor(
    private http: HttpClient
  ) {
    super(environment.backend)
  }

  getAll(): Observable<Box[]> {
    return this.http.get<Box[]>(this.url + '/boxes')
  }

  getById(id: number): Observable<Box> {
    return this.http.get<Box>(this.url + `/boxes/${id}`)
  }

  getItems(id: number, params: any) {
    return this.http.get<Box>(this.url + `/boxes/${id}/items`, { params })
  }

  getProperties(id: number, params: any) {
    return this.http.get<Box>(this.url + `/boxes/${id}/properties`, { params })
  }

  getConfig(id: number, params: any) {
    return this.http.get<Box>(this.url + `/boxes/${id}/config`, { params })
  }
}
