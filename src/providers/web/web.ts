import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WebProvider {
  //baseURL: string = 'http://174.138.58.155:1000'
  //baseURL: string = 'http://192.168.86.27:1000'
  //baseURL: string = 'http://localhost:1000'
  //baseURL: string = 'http://192.168.3.248:1000';
  //baseURL: string = 'http://10.16.255.213:1000'
  baseURL: string = 'http://172.21.154.114:1000'

  constructor(public http: Http) {
  }

  loginPost(email, pin, pushToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let body = new URLSearchParams();
    body.append('email', email);
    body.append('pin', pin);
    body.append('pushToken', pushToken);

    return this.http.post(this.baseURL + '/login', body, options)
      .map(res => res.json());
  }

  forgot(email) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('email', email);

    return this.http.post(this.baseURL + '/forgot', body, options)
      .map(res => res.json());
  }

  chooseAlertsGet(token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseURL + '/chooseAlert', options)
      .map(res => res.json());
  }

  chooseAlertsPost(alertID, alertName, testModeON, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('alertID', alertID);
    body.append('alertName', alertName);
    body.append('testModeON', testModeON);

    return this.http.post(this.baseURL + '/chooseAlert', body, options)
      .map(res => res.json());
  }

  floorsGet(_id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseURL + '/sending/floor/' + _id, options)
      .map(res => res.json());
  }

  floorsPost(floorID, floorName, floorPhoto, testModeON, _id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('_id', _id);
    body.append('testModeON', testModeON);
    body.append('floorID', floorID);
    body.append('floorName', floorName);
    body.append('floorPhoto', floorPhoto);

    return this.http.post(this.baseURL + '/sending/floor', body, options)
      .map(res => res.json());
  }

  floorLocationGet(_id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseURL + '/sending/floorLocation/' + _id, options)
      .map(res => res.json());
  }

  floorLocationPost(token, _id, testModeON, sniperCoordinateX, sniperCoordinateY) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('_id', _id);
    body.append('testModeON', testModeON);
    body.append('sniperCoordinateX', sniperCoordinateX);
    body.append('sniperCoordinateY', sniperCoordinateY);

    return this.http.post(this.baseURL + '/sending/floorLocation', body, options)
      .map(res => res.json());
  }

  notesGet(_id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseURL + '/sending/notes/' + _id, options)
      .map(res => res.json());
  }

  notesPost(token, _id, testModeON, note) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('_id', _id);
    body.append('testModeON', testModeON);
    body.append('note', note);

    return this.http.post(this.baseURL + '/sending/floorLocation', body, options)
      .map(res => res.json());
  }

}
