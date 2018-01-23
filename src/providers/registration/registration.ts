// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RegistrationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegistrationProvider {

  constructor(public http: Http) {
    console.log('Hello RegistrationProvider Provider');
  }

  addUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = 'http://192.168.0.116:1888/user/register';
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  login(username){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = 'http://192.168.0.116:1888/user/login';
    return this.http.post(ep, username, { headers: headers })
      .map(res => res.json());
  }

  purchase(saman) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = 'http://192.168.0.116:1888/inventory/purchase';
    return this.http.post(ep, saman, { headers: headers })
      .map(res => res.json());
  }

  getAllItems(){
    let ep = 'http://192.168.0.116:1888/inventory/getAllItems';
    return this.http.get(ep)
      .map(res => res.json());
  }
}
