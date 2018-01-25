import { AlertPage } from './../pages/alert/alert';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { SettingsPage } from './../pages/settings/settings';
import { LoginPage } from './../pages/login/login';
import { HomePage } from '../pages/home/home';

export class NotificationModel {
	public body: string;
	public title: string;
	public tap: boolean
}

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
		private storage: Storage,
		private firebase: Firebase,
		private alertCtrl: AlertController
	) {
		this.initializeApp();

		// Initialize side-menu and navigation
		this.pages = [
			{ title: 'Settings', component: SettingsPage },
			{ title: 'Home', component: HomePage }
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			if (this.platform.is('cordova')) {
				// Initialize push notification feature
				this.platform.is('android') ? this.initializeFireBaseAndroid() : this.initializeFireBaseIos();
			} else {
				console.log('Push notifications are not enabled since this is not a real device');
			}
		});
	}

	openPage(page) {
		this.nav.setRoot(page.component);
	}

	onLogout() {
		this.storage.remove('token');
		this.nav.setRoot(LoginPage);
	}

	private initializeFireBaseAndroid(): Promise<any> {
		return this.firebase.getToken()
			.catch(error => console.error('Error getting token', error))
			.then(token => {
				console.log(`The token is ${token}`);
			});
	}

	private initializeFireBaseIos(): Promise<any> {
		return this.firebase.grantPermission()
			.catch(error => console.error('Error getting permission', error))
			.then(() => {
				this.firebase.getToken()
					.catch(error => console.error('Error getting token', error))
					.then(token => {
						console.log(`The token is ${token}`);
					});
			})

	}

	private saveToken(token: any): Promise<any> {
		// Send the token to the server
		console.log('Sending token to the server...');
		return Promise.resolve(true);
	}

	private subscribeToPushNotificationEvents(): void {

		// Handle token refresh
		this.firebase.onTokenRefresh().subscribe(
			token => {
				console.log(`The new token is ${token}`);
				this.saveToken(token);
			},
			error => {
				console.error('Error refreshing token', error);
			});

		// Handle incoming notifications
		this.firebase.onNotificationOpen().subscribe(
			(notification: NotificationModel) => {
				console.log(notification);

				!notification.tap
					? console.log('The user was using the app when the notification arrived...')
					: console.log('The app was closed when the notification arrived...');

				let notificationAlert = this.alertCtrl.create({
					title: notification.title,
					message: notification.body,
					buttons: ['Ok']
				});
				notificationAlert.present();
			},
			error => {
				console.error('Error getting the notification', error);
			});
	}
}
