import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { WebProvider } from './../../providers/web/web';
import { SummaryPage } from './../summary/summary';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  token: any;
  data: any;
  notePlaceholder: string;
  title: string;
  testModeOn: boolean;

  notes: string;

  testMode = 'testModeOff';

  constructor(public navCtrl: NavController, public navParams: NavParams, private web: WebProvider,
    public storage: Storage, private alertCtrl:AlertController) {

  }
  ionViewDidLoad() {
    this.data = this.navParams.data;

    this.storage.get('token')
      .then((token) => {
        if (!token) {
          this.navCtrl.setRoot('LoginPage');
        }
        this.token = token;
        this.getNotes();
      });
  }

  getNotes() {
    this.web.notesGet(this.data._id, this.token)
      .then(response => {
        if (response.success == true) {
          this.testModeOn = response.testModeOn;
          this.title = response.title;
          this.notePlaceholder = response.notePlaceholder;
        }
        else this.navCtrl.popToRoot();
      })
  }
  
  onNotes(notes) {
    var data;
    
    this.web.notesPost(this.token, this.data._id, this.data.testModeON, notes)
      .then(response => {
        if (response.success == true) {
          data = {
            _id: this.data._id
          }
          if (response.redirect == 'summary') this.navCtrl.push(SummaryPage, data);
          if (response.redirect == 'home') this.navCtrl.popToRoot();
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: response.message,
            buttons: ['Dismiss']
          });
          alert.present();
        }
      })
  }
}