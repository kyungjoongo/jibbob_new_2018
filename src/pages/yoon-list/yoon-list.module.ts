import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YoonListPage } from './yoon-list';

@NgModule({
  declarations: [
    YoonListPage,
  ],
  imports: [
    IonicPageModule.forChild(YoonListPage),
  ],
})
export class YoonListPageModule {}
