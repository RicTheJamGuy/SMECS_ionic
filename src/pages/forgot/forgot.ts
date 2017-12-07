import { ForgotSuccessPage } from './../forgot-success/forgot-success';
import { WebProvider } from './../../providers/web/web';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public toastCtrl: ToastController, public web:WebProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

  forgot(email) {
    var data: any;

    // setting up loader
    const loader = this.loading.create({
      content: 'Resetting password...',
    });

    //setting up toast
    const toast = this.toastCtrl.create({
      message: 'Email incorrect',
      duration: 2000,
      position: 'middle'
    })

    loader.present();

    this.web.forgot(email)
      .subscribe(response => {
        data = response;
        if (data.success == true) {
          this.navCtrl.push(ForgotSuccessPage, data.email);
        }
        else {
          toast.present();
        };
        loader.dismiss();
      });
  }
}
