import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';

import { WebProvider } from './../../providers/web/web';

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  token: any;
  data: any;
  alertName: any;
  floorName: any;
  floorPhoto: string;
  floorPlanURL: string;
  alertColor: any;
  sniperCoordinateX: number;
  sniperCoordinateY: number;
  sniperHidden: boolean = false;
  note: any;
  testModeOnArrays: any[];
  testModeOn: any = 'False';

  constructor(public navCtrl: NavController, public navParams: NavParams, private web: WebProvider,
    private storage: Storage, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.data;

    this.storage.get('token')
      .then((token) => {
        if (!token) {
          this.navCtrl.setRoot('LoginPage');
        }
        this.token = token;
        this.getSummary();
      });
  }

  showSniper(x, y) {
    console.log(x);
    if (x == undefined) {    //if user didn't chose to touch/click floor map
      this.sniperHidden = true;
    }
    else { // put sniper cross .png visible
      document.getElementById("div2").className = "div3";
      document.getElementById("div3").style.left = x + 'px';
      document.getElementById("div3").style.top = y + 'px';
    }
  }

  getSummary() {
    this.web.summaryGet(this.data._id, this.token)
      .then(response => {
        if (response.success == true) {
          if (response.testModeON == 'true') this.testModeOn = 'True';
          this.alertName = response.results.alertName;
          this.alertColor = response.results.alertGroupName;
          this.floorName = response.results.floorName;
          this.note = response.results.note;
          this.floorPhoto = response.results.floorPhoto;
          this.sniperCoordinateX = response.results.sniperCoordinateX;
          this.sniperCoordinateY = response.results.sniperCoordinateY;
          this.getFloorPhoto();
          this.showSniper(this.sniperCoordinateX, this.sniperCoordinateY);
        }
        else {
          this.navCtrl.popToRoot();
        }
      })
  }

  onSend() {
    let prompt = this.alertCtrl.create({
      message: "Please enter your 4 digit pin.",
      inputs: [
        {
          type: 'password',
          name: 'pin',
          placeholder: 'Pin'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: pin => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: pin => {
            this.web.summaryPost(this.token, this.data._id, pin)
              .then(response => {
                if (response.success == true) {
                  let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: response.message,
                    buttons: ['Dismiss']
                  });
                  alert.present();
                }
                else {
                  let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: response.message,
                    buttons: ['Dismiss']
                  });
                  alert.present();
                }
                if (response.redirect == 'home') this.navCtrl.popToRoot();
              })
          }
        }
      ]
    });
    prompt.present();
  }

  getFloorPhoto() {
    this.storage.get('ipAddress')
      .then((ipAddress) => {
        this.floorPlanURL = 'http://' + ipAddress + '/public/floorPlans/' + this.floorPhoto
      }
      );
  }
}