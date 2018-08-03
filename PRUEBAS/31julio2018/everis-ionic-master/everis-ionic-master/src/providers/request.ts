import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, ResponseContentType } from '@angular/http';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestProvider {

  private authToken: string = '';

  constructor(
    public http: Http) {
  }

  /**
   * Establece el token de autorización
   * @param token 
   */
  public setAuthorizationToken(token: string) {
    this.authToken = token;
  }

  /**
   * Obtiene el token de autorización
   */
  public getAuthorizationToken(): string {
    return this.authToken;
  }

  /**
   * Realiza una petición HTTP usando el metodo GET
   * @param url URL de petición
   * @param params Parámetros de la peticion
   * @param isSecure Indica si realiza una petición con seguridad incluida
   */
  public get(url: string, params?: object, isSecure: boolean = true): Promise<any> {
    console.log('GET: ' + url);
    
    let options: RequestOptionsArgs = {};

    if (isSecure) {
      options.headers = this.getAuthorizationHeader();
    }

    return this.http.get(url, options)
      .map(this.getData)
      //.catch(this.getError)
      .toPromise();
  }

  /**
   * Realiza una petición HTTP usando el metodo POST
   * @param url URL de petición
   * @param data Datos de la petición
   * @param isSecure Indica si realiza una petición con seguridad incluida
   */
  public post(url: string, data?: object, isSecure: boolean = true): Promise<any> {
    console.log('POST: ' + url);

    let options: RequestOptionsArgs = {};

    if (isSecure) {
      options.headers = this.getAuthorizationHeader();
    }

    return this.http.post(url, data, options)
      .map(this.getData)
      //.catch(this.getError)
      .toPromise();
  }

  /**
   * Realiza una petición HTTP usando el metodo DELETE
   * @param url URL de petición
   * @param isSecure Indica si realiza una petición con seguridad incluida
   */
  public remove(url: string, isSecure: boolean = true): Promise<any> { 
    console.log('POST: ' + url);

    let options: RequestOptionsArgs = {};

    if (isSecure) {
      options.headers = this.getAuthorizationHeader();
    }

    return this.http.delete(url, options)  
      .map(this.getData)
      //.catch(this.getError)
      .toPromise();
  }

  /**
   * Obtiene la cabecera con el token de autorización
   */
  private getAuthorizationHeader(): Headers {
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return headers;
  }

  /**
   * Procesa la respuesta de la petición
   */
  private getData(response: Response): any {
    if (response.headers.get('content-type').indexOf('application/json') >= 0) {
      return response.json();
    }
    return response.text();
  }

}
