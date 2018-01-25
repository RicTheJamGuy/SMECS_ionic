import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { WebProvider } from './../../providers/web/web';
import { HomePage } from '../home/home';
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
  testModeOnArrays: any[];
  testModeOn: boolean;

  testMode = 'testModeOff';

  constructor(public navCtrl: NavController, public navParams: NavParams, private web: WebProvider,
    public storage: Storage, private toastCtrl:ToastController) {

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
          this.testModeOnArrays = response.testModeOnArrays;
          this.title = response.title;
          this.notePlaceholder = response.notePlaceholder;
        }
        else this.navCtrl.setRoot(HomePage);
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