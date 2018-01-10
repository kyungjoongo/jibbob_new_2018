import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KangListPage } from './kang-list';

@NgModule({
  declarations: [
    KangListPage,
  ],
  imports: [
    IonicPageModule.forChild(KangListPage),
  ],
})
export class KangListPageModule {}
