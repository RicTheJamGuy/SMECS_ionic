import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorLocationPage } from './floor-location';

@NgModule({
  declarations: [
    FloorLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(FloorLocationPage),
  ],
})
export class FloorLocationPageModule {}
