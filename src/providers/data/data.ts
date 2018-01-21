// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  purchaseItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = 'http://192.168.0.116:1888/inventory/purchase';
    return this.http.post(ep, item, { headers: headers })
      .map(res => res.json());
  }
}
