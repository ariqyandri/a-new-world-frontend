import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { City } from './models/city';

@Injectable({
  providedIn: 'root'
})
export class CityApiService extends Api {

  constructor(
    private http: HttpClient
  ) {
    super(environment.backend)
  }

  get(): Observable<City[]> {
    return this.http.get<City[]>(this.url + '/cities')
  }
}
