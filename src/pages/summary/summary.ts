import { AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';

import { WebProvider } from './../../providers/web/web';
import { HomePage } from './../home/home';

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
  alertColor: any;
  testModeOnArrays: any[];
  testModeOn: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private web: WebProvider,
    private storage: Storage, private alertCtrl:AlertController, private toastCtrl: ToastController) {
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

  getSummary() {
    this.web.summaryGet(this.data._id, this.token)
      .then(response => {
        if (response.success == true) {
          console.log(response);
          if (response.testModeON == true) this.testModeOn = 'True';
          this.alertColor = response.info.alertGroupName;
          this.alertName = response.info.alertName;
          this.floorName = response.info.floorName;
        }
        else this.navCtrl.setRoot(HomePage);
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
            console.log(this.data._id);
            this.web.summaryPost(this.token, this.data._id, pin)
            .then(response => {
              if (response.success == true) {
                console.log(response);
                if (response.redirect == 'home') this.navCtrl.popToRoot();
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
      ]
    });
    prompt.present();
  }
}