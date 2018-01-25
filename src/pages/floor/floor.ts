import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    public storage: Storage, private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.data;
    console.log(this.data);

    this.storage.get('token')
      .then((token) => {
        if (!token) {
          this.navCtrl.popToRoot();
        }
        this.token = token;
        this.getFloors();
      });
  }

  getFloors() {
    this.web.floorsGet(this.data._id, this.token)
      .then(response => {
        if (response.success == true) {
          this.floors = response.floor;
          this.title = response.title;
          this.testModeOnArrays = response.testModeOnArrays;
          this.testModeOn = response.testModeOn;
        }
        else this.navCtrl.setRoot(HomePage);
      })
  }

  onFloor(floorID, floorName, floorPlan) {
    var data: any; //this will contain all the data the goes to the next page.
    this.web.floorsPost(floorID, floorName, floorPlan, this.data.testModeON, this.data._id, this.token)
      .then(response => {
        if (response.success == true) {
          console.log(response);
          data = {
            _id: this.data._id,
            floorPlan: floorPlan
          }
          if (response.redirect == 'floorMap') this.navCtrl.push(FloorLocationPage, data);
          if (response.redirect == 'notes') this.navCtrl.push(NotesPage, data);
          if (response.redirect == 'home') this.navCtrl.push(HomePage);
        }
        else {
          // setting up toast
          const toast = this.toastCtrl.create({
            message: response.message,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      })
  }
}