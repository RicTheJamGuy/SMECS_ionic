import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FloorPage } from './../floor/floor';
import { WebProvider } from './../../providers/web/web';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token: any;
  realButtons: any;
  testButtons: any;
  panicHiddenReal = true;
  panicHiddenTest = true;

  testMode = 'testModeOff';
  testModeState = false;

  constructor(public navCtrl: NavController, private geolocation: Geolocation,
    public web: WebProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('token')
      .then((token) => {
        if (!token) this.navCtrl.setRoot('LoginPage');
        this.token = token;
        this.getButtons();
        this.getLocation();
      });
  }

  panic() {
    console.log('PANIC!!!');
  }

  getLocation() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        // resp.coords.latitude
        console.log(resp.coords.latitude, resp.coords.longitude);
        // resp.coords.longitude
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  getButtons() {
    this.web.chooseAlertsGet(this.token)
      .subscribe(response => {
        if (response.success == false) this.navCtrl.setRoot('LoginPage');
        if (response.testModeOnArrayReal[0].alertID == 1) {
          this.panicHiddenReal = false;
          response.testModeOnArrayReal.splice(0, 1);
        }
        if (response.testModeOnArrayTest[0].alertID == 1) {
          this.panicHiddenTest = false;
          response.testModeOnArrayTest.splice(0, 1);
        }
        if (response.testModeOnArrayReal != undefined && response.testModeOnArrayTest != undefined) {
          this.realButtons = response.testModeOnArrayReal;
          this.testButtons = response.testModeOnArrayTest;
        }
      });
  }

  chooseAlert(alertID, alertName, testModeON) {
    var data: any; //this will contain all the data the goes to the next page.

    this.web.chooseAlertsPost(alertID, alertName, testModeON, this.token)
      .subscribe(response => {
        if (response.success == true) {
          data = {
            _id: response._id
          }
          if (response.redirect == 'floor') this.navCtrl.push(FloorPage, data);
        }
      })
  }

  onTestMode(mode: boolean) {
      this.testModeState = mode;
  }

}
