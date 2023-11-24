import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Property } from './models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyApiService extends Api {

  constructor(
    private http: HttpClient
  ) {
    super(environment.backend)
  }

  getAll(): Observable<Property[]> {
    return this.http.get<Property[]>(this.url + '/properties')
  }

  getByName(name: string): Observable<Property[]> {
    return this.http.get<Property[]>(this.url + `/properties/${name}`)
  }
}
