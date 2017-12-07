import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WebProvider } from './../../providers/web/web';
import { FloorLocationPage } from './../floor-location/floor-location';
import { HomePage } from '../home/home';
import { NotesPage } from '../notes/notes';

@IonicPage()
@Component({
  selector: 'page-floor',
  templateUrl: 'floor.html',
})
export class FloorPage {
  token: any;
  data: any;
  floors: any;
  title: string;
  testModeOnArrays: any[];
  testModeOn: boolean;

  isAndroid: boolean = false;
  isiOS: boolean = false;

  testMode = 'testModeOff';

  floorPhoto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private web: WebProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.data;

    this.storage.get('token')
      .then((token) => {
        if (!token) {
          this.navCtrl.setRoot('LoginPage');
        }
        this.token = token;
        this.getFloors();
      });
  }

  getFloors() {
    this.web.floorsGet(this.data._id, this.token)
      .subscribe(response => {
        if (response.success == true) {
          this.floors = response.floor;
          this.title = response.title;
          this.testModeOnArrays = response.testModeOnArrays;
          this.testModeOn = response.testModeOn;
        }
        else this.navCtrl.setRoot(HomePage);
      })
  }

  onBack() {
    this.navCtrl.pop();
  }

  onFloor(floorID, floorName, floorPhoto) {
    var data: any; //this will contain all the data the goes to the next page.
    this.web.floorsPost(floorID, floorName, floorPhoto, this.data.testModeON, this.data._id, this.token)
      .subscribe(response => {
        if (response.success == true) {
          data = {
            _id: this.data._id
          }
          if (response.redirect == 'floorMap') this.navCtrl.push(FloorLocationPage, data);
          if (response.redirect == 'notes') this.navCtrl.push(NotesPage, data);
        }
      })
  }
}