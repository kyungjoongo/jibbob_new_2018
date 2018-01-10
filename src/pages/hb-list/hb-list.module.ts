import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HbListPage } from './hb-list';

@NgModule({
  declarations: [
    HbListPage,
  ],
  imports: [
    IonicPageModule.forChild(HbListPage),
  ],
})
export class HbListPageModule {}
