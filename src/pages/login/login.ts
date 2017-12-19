import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public web: WebProvider,
    public storage: Storage) {

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
      .subscribe(response => {
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
}
