import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CookieHandler {
  private _hasConsent: boolean = false;

  constructor() {
    this._hasConsent = this.get('CONSENT') === '1';
  }

  /**
   * 
   * @param name 
   * @param value 
   * @param expires ISO 8601 
   * @param path 
   */
  public set(name: string, value: string, expires: number | string, path: string = ''): void {
    const _expires = 'expires=' + this._expires(expires).toUTCString()
    const _path = 'path=' + this._path(path)
 
    document.cookie = `${name}=${encodeURIComponent(value)}; ${_expires}; ${_path};`;
  }

  public get(name: string): string | undefined {
    const cookie = document.cookie?.split('; ').find((c) => c.startsWith(name + '='))

    return cookie ? decodeURIComponent(cookie.split('=')[1] ?? '') : undefined
  }

  public delete(name: string): void {
    this.set(name, '', -1)
  }

  public consent(consent: boolean) {
    this.set('CONSENT', consent ? '1' : '0', 100);
    this._hasConsent = consent
  }

  private _expires(expires: number | string): Date {
    let _expires = new Date();
    if (typeof expires === 'number') {
      _expires.setDate(_expires.getDate() + expires);
    } else if (typeof expires === 'string') {
      _expires = new Date(expires)
    }
    return _expires
  }

  private _path(path: string): string {
    let _path = '/' + path
    if (location.protocol === 'https:' && environment.production || !environment.production) {
      // Secure
      // HttpOnly
      _path += ';'
    }
    return _path
  }
}
