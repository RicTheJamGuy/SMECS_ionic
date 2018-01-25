import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { HomePage } from './../home/home';
import { WebProvider } from './../../providers/web/web';
import { ForgotPage } from './../forgot/forgot';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  pushToken: any;
  ipAddress: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public web: WebProvider,
    public storage: Storage,
    private alertCtrl: AlertController) {

    this.storage.get('ipAddress')
      .then((ipAddress) => {
        if (ipAddress == '') {
          this.promptForIP();
        }
        else {
          this.ipAddress = ipAddress;
        }
      });

    this.storage.get('token')
      .then((token) => {
        if (token == '') {
          this.navCtrl.setRoot('LoginPage');
        }
      });
    this.storage.get('pushToken')
      .then((pushToken) => {
        this.pushToken = pushToken;
      });
  }

  login(email, pin) {

    // setting up loader
    const loader = this.loading.create({
      content: 'Logging you in...',
    });

    // setting up toast
    const toast = this.toastCtrl.create({
      message: 'Username or pin incorrect',
      duration: 2000,
      position: 'middle'
    });

    loader.present();

    this.web.loginPost(email, pin, this.pushToken)
      .then(response => {
        if (response.success == true) {
          this.storage.set('token', response.token);
          this.navCtrl.setRoot(HomePage);
        }
        else {
          toast.present();
        };
        loader.dismiss();
      });
  }

  forgot() {
    this.navCtrl.push(ForgotPage);
  }

  promptForIP() {
    let ipAlert = this.alertCtrl.create({
      title: 'IP Address',
      inputs: [
        {
          name: 'ipAddress',
          placeholder: '192.168.0.1'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            console.log(this.ipAddress);
            this.storage.set('ipAddress', data.ipAddress);
            this.ipAddress = data.ipAddress;
            console.log(this.ipAddress);
          }
        }
      ]
    });
    ipAlert.present();
    console.log(this.ipAddress);
  }
}
