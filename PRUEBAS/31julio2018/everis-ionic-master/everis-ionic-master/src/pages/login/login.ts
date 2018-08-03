import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertProvider } from './../../providers/alert';
import { LoadingProvider } from './../../providers/loading';
import { RequestProvider } from './../../providers/request';
import { HomePage } from './../home/home';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


import {  HttpResponse } from '@angular/common/http';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public username: string;
  public password: string;
  public travellers : any;

  constructor(public navCtrl: NavController,
    public request: RequestProvider,
    public loading: LoadingProvider,
    public alert: AlertProvider,
    private http: HttpClient) {

  }

  
  public login(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      })
    };
    
    let url ='https://agile-transformation.eu.cloudhub.io/api/1.0.development/employees/dpbotero/validate';
    
    
    this.http.get(url,httpOptions).subscribe(response => {
            console.log(response);
      }, err => {
        console.log(err);
        
        console.log("User authentication failed!");
      });
    /*
    this.http.get('https://caro-chatboot.de-c1.cloudhub.io/api/1.1/employees/dbotero/unblock').subscribe(response => {
          console.log(response);
    }, err => {
       console.log("User authentication failed!");
    });
    
    /*
      let url: string = 'https://httpbin.org/anything';
      url += '/' + this.username;
      url += '/' + this.password;

      console.log('Username: ' + this.username);
      console.log('Password: ' + this.password);
      console.log('URL: ' + url);

      this.request.get(url).then(result => {
        console.log('Success', result);
        this.loading.dismiss();

        this.navCtrl.setRoot(HomePage);
      }).catch(error => {
        console.log('Error', error);
        this.loading.dismiss();
        this.alert.show('Error de autenticación');
      });
    */
  }
}