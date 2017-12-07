import { Firebase } from '@ionic-native/firebase';
import { Push } from '@ionic-native/push';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { LoginPageModule } from './../pages/login/login.module';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { ForgotSuccessPage } from './../pages/forgot-success/forgot-success';
import { FloorPage } from '../pages/floor/floor';
import { FloorLocationPage } from './../pages/floor-location/floor-location';
import { NotesPage } from './../pages/notes/notes';

import { WebProvider } from '../providers/web/web';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ForgotPage,
    ForgotSuccessPage,
    FloorPage,
    FloorLocationPage,
    NotesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ForgotPage,
    ForgotSuccessPage,
    FloorPage,
    FloorLocationPage,
    NotesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WebProvider,
    Geolocation,
    Push,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}