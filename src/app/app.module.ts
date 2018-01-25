import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { NativeRingtones } from '@ionic-native/native-ringtones';
import { MyApp } from './app.component';
import { Firebase } from '@ionic-native/firebase';

import { SettingsPage } from './../pages/settings/settings';
import { LoginPageModule } from './../pages/login/login.module';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { ForgotSuccessPage } from './../pages/forgot-success/forgot-success';
import { FloorPage } from '../pages/floor/floor';
import { FloorLocationPage } from './../pages/floor-location/floor-location';
import { NotesPage } from './../pages/notes/notes';
import { AlertPage } from '../pages/alert/alert';
import { StudentPage } from './../pages/student/student';
import { SummaryPage } from './../pages/summary/summary';

import { WebProvider } from '../providers/web/web';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ForgotPage,
    ForgotSuccessPage,
    FloorPage,
    FloorLocationPage,
    NotesPage,
    AlertPage,
    SettingsPage,
    SummaryPage,
    StudentPage
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
    NotesPage,
    AlertPage,
    SettingsPage,
    SummaryPage,
    StudentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WebProvider,
    Geolocation,
    Firebase,
    NativeRingtones,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}