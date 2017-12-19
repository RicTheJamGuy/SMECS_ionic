import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class AlertPage {
  data: any;
  title: any = 'trespassor';
  message: any = 'There is a trespassor in the building.';
  procedure: any = 'run away';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.data;

    this.title = this.data.title;
    this.message = this.data.message;
    this.procedure = this.data.procedure;
  }

}
