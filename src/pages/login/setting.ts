import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, Platform} from 'ionic-angular';

import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {LocalStorageService} from "angular-2-local-storage";
import {Events} from 'ionic-angular';
import {KangListPage} from "../kang-list/kang-list";

@IonicPage()
@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html',
})
export class Setting {

    @ViewChild(Nav) nav: Nav;
    userData: any;
    loggined: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public localstorageservice: LocalStorageService
        , public events: Events
        , public platform: Platform
        , private fb: Facebook) {

        if(this.platform.is('cordova') ) {
            this.fb.getLoginStatus().then(response => {
                if (response.status == 'connected') {
                    this.userData = this.localstorageservice.get('userData');
                }
            })
        }else{
            console.log('###############코도바아님');
        }





    }

    btnLogout() {

        this.fb.getLoginStatus().then(response => {
            if (response.status == 'connected') {
                this.fb.logout();
                this.localstorageservice.set('userData', null);
                this.events.publish('user:logined', this.userData, Date.now());

                alert('로그아웃 되었습니다.')
            }

        })

    }

    exitApp(){
        if(confirm('진짜로 종료하실꺼예요?')){
            this.platform.exitApp();
        }

    }

}
