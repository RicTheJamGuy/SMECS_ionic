import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorPage } from './floor';

@NgModule({
  declarations: [
    FloorPage,
  ],
  imports: [
    IonicPageModule.forChild(FloorPage),
  ],
})
export class FloorPageModule {}
