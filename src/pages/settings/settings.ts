import { NativeRingtones } from '@ionic-native/native-ringtones';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  rtones: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ringtones: NativeRingtones, public platform: Platform) {
  }

  ionViewDidLoad() {
    if (this.platform.is('cordova')) {
      this.ringtones.getRingtone()
        .then((ringtones) => {
          this.rtones = ringtones;
          console.log(ringtones[0].Url);

          this.ringtones.playRingtone(ringtones[0].Url);
        });
    }
  }

}
