import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WebProvider } from '../../providers/web/web';
import { HomePage } from '../home/home';
import { SummaryPage } from '../summary/summary';
import { NotesPage } from '../notes/notes';

@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
  searchQuery: string = '';
  students: any;
  searchStudents: any;
  data: any;
  token: any;
  ipAddress: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    private web: WebProvider, private alertCtrl:AlertController) {
  }

  loadStudent() {
    this.web.studentsGet(this.data._id, this.token)
      .then((response) => {
        if (response.success == true) {
          this.students = response.student;
          this.initializeItems();
        }
        else this.navCtrl.setRoot(HomePage);
      });
  }

  initializeItems() {
    this.searchStudents = [];
    this.students.forEach(student => {
      if (student.photo == '') student.photo = 'photoNotAvailable.bmp';
      this.searchStudents.push({ name: student.firstName + ' ' + student.lastName, photo: student.photo });
    });
  }

  ionViewDidLoad() {
    this.data = this.navParams.data;

    this.storage.get('ipAddress')
      .then((ipAddress) => {
        this.ipAddress = ipAddress;
      }
      );

    this.storage.get('token')
      .then((token) => {
        if (!token) {
          this.navCtrl.setRoot('LoginPage');
        }
        this.token = token;
        this.loadStudent();
      });

  }

  getStudents(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchStudents = this.searchStudents.filter((student) => {
        return (student.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onClick(studentName, studentPhoto) {
    var data;

    this.web.studentsPost(this.token, this.data._id, studentName, studentPhoto)
      .then(response => {
        if (response.success == true) {
          data = {
            _id: this.data._id
          }
          if (response.redirect == 'summary') this.navCtrl.push(SummaryPage, data);
          if (response.redirect == 'home') this.navCtrl.push(HomePage);
          if (response.redirect == 'notes') this.navCtrl.push(NotesPage, data);
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
