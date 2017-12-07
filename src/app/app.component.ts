import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Firebase } from '@ionic-native/firebase';
import { Storage } from '@ionic/storage';

import { LoginPage } from './../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private push: Push,
    private firebase: Firebase,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();

    // Initialize side-menu and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushsetup();

      if (this.platform.is('cordova')) {
        this.firebase.getToken()
          .then(pushToken => {
            this.storage.set('pushToken', pushToken); // save the pushToken
            console.log(pushToken);
          })
          .catch(error => alert('Error getting token' + error));

        this.firebase.onTokenRefresh()
          .subscribe((pushToken: string) => {
            this.storage.set('pushToken', pushToken);
            //alert(pushToken);
          });
      }
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  pushsetup() {
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: 'New Push notification',
          message: notification.message
        });
        console.log(notification.message);
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log(registration.registrationId);
      alert(registration.registrationId);
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
}
