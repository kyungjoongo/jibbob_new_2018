import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NbListPage } from './nb-list';

@NgModule({
  declarations: [
    NbListPage,
  ],
  imports: [
    IonicPageModule.forChild(NbListPage),
  ],
})
export class NbListPageModule {}
