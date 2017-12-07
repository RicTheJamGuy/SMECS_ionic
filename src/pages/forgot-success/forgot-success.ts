import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ForgotSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-success',
  templateUrl: 'forgot-success.html',
})
export class ForgotSuccessPage {
  email: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.email = this.navParams.data;
  }

  toLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

}
