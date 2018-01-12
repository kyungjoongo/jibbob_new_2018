import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {LocalStorageService} from "angular-2-local-storage";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {KangListPage} from "../kang-list/kang-list";

/**
 * Generated class for the LoginMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-main',
  templateUrl: 'login-main.html',
})
export class LoginMainPage {


    @ViewChild(Nav) nav: Nav;

    constructor(public navCtrl: NavController, public navParams: NavParams, public localstorageservice: LocalStorageService
        , public events: Events
        , private fb: Facebook) {


    }

    userData: any;

    btnSkipLogin(){
        this.localstorageservice.set('userData', null);
        this.navCtrl.setRoot(KangListPage)
    }

    btnLogin() {

        this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {

            console.log('###############' + JSON.stringify(response.authResponse));

            console.log('###############' + response.authResponse.userID);

            let fbUserId = response.authResponse.userID;

            this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = {
                    email: profile['email']
                    , first_name: profile['first_name']
                    , picture: profile['picture_large']['data']['url']
                    , username: profile['name']
                    , user_id: fbUserId

                }

                this.localstorageservice.set('userData', this.userData);
                this.events.publish('user:logined', this.userData, Date.now());

            });
        }).catch(err => {

            alert('애러네요~');
        })


    }

}
