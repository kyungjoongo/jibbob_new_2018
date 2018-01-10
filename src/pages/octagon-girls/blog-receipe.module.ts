import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogReceipe } from './blog-receipe';

@NgModule({
  declarations: [
      BlogReceipe,
  ],
  imports: [
    IonicPageModule.forChild(BlogReceipe),
  ],
})
export class OctagonGirlsPageModule {}
