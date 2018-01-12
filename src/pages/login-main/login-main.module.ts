import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginMainPage } from './login-main';

@NgModule({
  declarations: [
    LoginMainPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginMainPage),
  ],
})
export class LoginMainPageModule {}
