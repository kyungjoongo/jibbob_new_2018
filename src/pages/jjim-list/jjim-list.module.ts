import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JjimListPage } from './jjim-list';

@NgModule({
  declarations: [
    JjimListPage,
  ],
  imports: [
    IonicPageModule.forChild(JjimListPage),
  ],
})
export class JjimListPageModule {}
