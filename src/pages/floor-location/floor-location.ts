import { Storage } from '@ionic/storage';
import { WebProvider } from './../../providers/web/web';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Gesture, Content } from 'ionic-angular';

import { HomePage } from '../home/home';
import { NotesPage } from '../notes/notes';

@IonicPage()
@Component({
  selector: 'page-floor-location',
  templateUrl: 'floor-location.html'
})
export class FloorLocationPage {
  @ViewChild(Content) content: Content;
  @ViewChild('zoom') zoom: ElementRef;

  token: any;
  data: any;
  floorID: any;
  floorName: string;
  floorPhoto: string;
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
        this.getFloorLocation();
      });
  }

  getFloorLocation() {
    this.web.floorLocationGet(this.data._id, this.token)
      .subscribe(response => {
        if (response.success == true) {
          this.testModeOn = response.testModeOn;
          this.testModeOnArrays = response.testModeOnArrays;
          this.title = response.title;
          this.floorID = response.floorID;
          this.floorName = response.floorName;
          this.floorPhoto = response.floorPhoto;
        }
        else this.navCtrl.setRoot(HomePage);
      })
  }

  onBack() {
    this.navCtrl.pop();
  }

  onMapClick(e) {
    console.log('X: ', e.offsetX);
    console.log('Y: ', e.offsetY);
  }

  onFloorLocation(sniperCoordinateX, sniperCoordinateY) {
    var data: any; //this will contain all the data the goes to the next page.
    this.web.floorLocationPost(this.token, this.data._id, this.data.testModeON, sniperCoordinateX, sniperCoordinateY)
      .subscribe(response => {
        if (response.success == true) {
          data = {
            _id: this.data._id
          }
          if (response.redirect == 'notes') this.navCtrl.push(NotesPage, data);
        }
      })
  }

  /*
  * @Author: Sebastian Penafiel Torres 
  * @Date: 2017-04-23 19:25:39 
  * @Last Modified by:   Sebastian Penafiel Torres 
  * @Last Modified time: 2017-04-23 19:25:39 
  */

  ionViewDidEnter(): void {
    // Page must be fully rendered, ionViewDidLoad, doesnt work for this. Because it shows clientHeight without the margin of the header
    this._pinchZoom(this.zoom.nativeElement, this.content);
  }

  private _pinchZoom(elm: HTMLElement, content: Content): void {
    const _gesture = new Gesture(elm);

    // max translate x = (container_width - element absolute_width)px
    // max translate y = (container_height - element absolute_height)px
    let ow = 0;
    let oh = 0;
    for (let i = 0; i < elm.children.length; i++) {
      let c = <HTMLElement>elm.children.item(i);
      ow = c.offsetWidth;
      oh += c.offsetHeight;
    }
    const original_x = content.contentWidth - ow;
    const original_y = content.contentHeight - oh;
    let max_x = original_x;
    let max_y = original_y;
    let min_x = 0;
    let min_y = 0;
    let x = 0;
    let y = 0;
    let last_x = 0;
    let last_y = 0;
    let scale = 1;
    let base = scale;

    _gesture.listen();
    _gesture.on('pan', onPan);
    _gesture.on('panend', onPanend);
    _gesture.on('pancancel', onPanend);
    // _gesture.on('tap', onTap);
    _gesture.on('pinch', onPinch);
    _gesture.on('pinchend', onPinchend);
    _gesture.on('pinchcancel', onPinchend);

    function onPan(ev) {
      setCoor(ev.deltaX, ev.deltaY);
      transform();
    }
    function onPanend() {
      // remembers previous position to continue panning.
      last_x = x;
      last_y = y;
    }
    /*
    function onTap(ev) {
      if (ev.tapCount === 2) {
        let reset = false;
        scale += .5;
        if (scale > 2) {
          scale = 1;
          reset = true;
        }
        setBounds();
        reset ? transform(max_x/2, max_y/2) : transform();
      }
    }
    */
    function onPinch(ev) {
      // formula to append scale to new scale
      scale = base + (ev.scale * scale - scale) / scale

      setBounds();
      transform();
    }
    function onPinchend() {
      if (scale > 4) {
        scale = 4;
      }
      if (scale < 0.5) {
        scale = 0.5;
      }
      // lets pinch know where the new base will start
      base = scale;
      setBounds();
      transform();
    }
    function setBounds() {
      // I am scaling the container not the elements
      // since container is fixed, the container scales from the middle, while the
      // content scales down and right, with the top and left of the container as boundaries
      // scaled = absolute width * scale - already set width divided by 2;
      let scaled_x = Math.ceil((elm.offsetWidth * scale - elm.offsetWidth) / 2);
      let scaled_y = Math.ceil((elm.offsetHeight * scale - elm.offsetHeight) / 2);
      // for max_x && max_y; adds the value relevant to their overflowed size
      let overflow_x = Math.ceil(original_x * scale - original_x); // returns negative
      let overflow_y = Math.ceil(oh * scale - oh);

      max_x = original_x - scaled_x + overflow_x;
      min_x = 0 + scaled_x;
      // remove added height from container
      max_y = original_y + scaled_y - overflow_y;
      min_y = 0 + scaled_y;

      setCoor(-scaled_x, scaled_y);
      console.info(`x: ${x}, scaled_x: ${scaled_x}, y: ${y}, scaled_y: ${scaled_y}`)
    }
    function setCoor(xx: number, yy: number) {
      x = Math.min(Math.max((last_x + xx), max_x), min_x);
      y = Math.min(Math.max((last_y + yy), max_y), min_y);
    }
    // xx && yy are for resetting the position when the scale return to 1.
    function transform(xx?: number, yy?: number) {
      elm.style.webkitTransform = `translate3d(${xx || x}px, ${yy || y}px, 0) scale3d(${scale}, ${scale}, 1)`;
    }
  }

}



