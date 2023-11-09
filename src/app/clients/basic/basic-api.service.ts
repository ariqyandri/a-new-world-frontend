import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Basic } from './models/basic';

@Injectable({
  providedIn: 'root'
})
export class BasicApiService extends Api {

  constructor(
    private http: HttpClient
  ) {
    super(environment.backend)
  }

  get(): Observable<Basic> {
    return this.http.get<Basic>(this.url + '/basic')
  }
}
