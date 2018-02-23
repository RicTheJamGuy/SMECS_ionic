import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class WebProvider {
  baseURL: string;
  //baseURL: string = 'http://174.138.58.155:1000';
  //baseURL: string = 'http://192.168.86.31:1000'; // Localhost @ home
  //baseURL: string = 'http://localhost:1000';
  //baseURL: string = 'http://192.168.3.248:1000'; // Basement @ Pedro's 
  //baseURL: string = 'http://172.21.154.114:1000';
  //baseURL: string = 'http://192.168.86.21:1000';
  //baseURL: string = 'http://192.168.3.140:1000'; // Localhost @ Pedro's house

  constructor(public http: Http, public storage: Storage) {
  }

  loginPost(email, pin, pushToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let body = new URLSearchParams();
    body.append('email', email);
    body.append('pin', pin);
    body.append('pushToken', pushToken);

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.post(baseURL + '/login', body, options)
          .map(res => res.json()).toPromise();
      });
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

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.get(baseURL + '/chooseAlert', options)
          .map(res => res.json()).toPromise();
      });
  }

  chooseAlertsPost(alertID, alertName, testModeON, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('alertID', alertID);
    body.append('alertName', alertName);
    body.append('testModeON', testModeON);

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.post(baseURL + '/chooseAlert', body, options)
          .map(res => res.json()).toPromise();
      });
  }

  floorsGet(_id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.get(baseURL + '/sending/floor/' + _id, options)
          .map(res => res.json()).toPromise();
      });
  }

  floorsPost(floorID, floorName, floorPhoto, testModeON, _id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('_id', _id);
    body.append('floorID', floorID);
    body.append('floorName', floorName);
    body.append('floorPhoto', floorPhoto);

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.post(baseURL + '/sending/floor/', body, options)
          .map(res => res.json()).toPromise();
      });
  }

  floorLocationGet(_id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.get(baseURL + '/sending/floorLocation/' + _id, options)
          .map(res => res.json()).toPromise();
      });
  }

  floorLocationPost(token, _id, testModeON, sniperCoordinateX, sniperCoordinateY) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('_id', _id);
    body.append('coordinateX', sniperCoordinateX);
    body.append('coordinateY', sniperCoordinateY);

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.post(baseURL + '/sending/floorLocation/', body, options)
          .map(res => res.json()).toPromise();
      });
  }

  notesGet(_id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.get(baseURL + '/sending/notes/' + _id, options)
          .map(res => res.json()).toPromise();
      });
  }

  notesPost(token, _id, testModeON, note) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('_id', _id);
    body.append('note', note);

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.post(baseURL + '/sending/notes/', body, options)
          .map(res => res.json()).toPromise();
      });
  }

  summaryGet(_id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.get(baseURL + '/sending/summary/' + _id, options)
          .map(res => res.json()).toPromise();
      });
  }

  summaryPost(token, _id, pin) { //To send the pin
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('_id', _id);
    body.append('pin', pin);

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.post(baseURL + '/sending/summary/', body, options)
          .map(res => res.json()).toPromise();
      });
  }

  studentsGet(_id, token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.get(baseURL + '/sending/student/' + _id, options)
          .map(res => res.json()).toPromise();
      });
  }

  studentsPost(token, _id, student, photo) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    body.append('_id', _id);
    body.append('student', student);
    body.append('photo', photo);

    return this.getBaseURL()
      .then(baseURL => {
        return this.http.post(baseURL + '/sending/student/', body, options)
          .map(res => res.json()).toPromise();
      });
  }

  getBaseURL() {
    return this.storage.get('ipAddress')
      .then((ipAddress) => {
        return 'http://' + ipAddress;
      });
  }
}
