import { Storage } from '@ionic/storage';

import { WebProvider } from './../../providers/web/web';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

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
    public storage: Storage) {

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
      .subscribe(response => {
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
    this.web.notesPost(this.token, this.data._id, this.data.testModeON, notes)
      .subscribe(response => {
        if (response.success == true) console.log('DONE!!');
      })
  }
}