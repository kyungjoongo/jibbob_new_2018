import {Component, ViewChild} from '@angular/core';
import {AlertController, Events, Nav, Platform, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BlogReceipe} from "../pages/octagon-girls/blog-receipe";
import {AdMobPro} from "@ionic-native/admob-pro";
import {AboutPage} from "../pages/about/about";
import {NbListPage} from "../pages/nb-list/nb-list";
import {HbListPage} from "../pages/hb-list/hb-list";
import {KangListPage} from "../pages/kang-list/kang-list";
import {YoonListPage} from "../pages/yoon-list/yoon-list";
import {JjimListPage} from "../pages/jjim-list/jjim-list";
import {Setting} from "../pages/login/setting";
import {LocalStorageService} from "angular-2-local-storage";
import {CommentPage} from "../pages/comment/comment";
import {LoginMainPage} from "../pages/login-main/login-main";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = LoginMainPage;
    //rootPage: any = TitleHolderPage
    userImage: any;
    userName: any;
    myDate: any;

    pages: Array<{ title: string, component: any, icon: any }>;

    alert: any;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private admob: AdMobPro
        , public localstorageservice: LocalStorageService, public events: Events
        , public alertCtrl: AlertController, public toastCtrl: ToastController) {

        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            /*{title: 'Fight Card', component: HomePage},*/
            {title: '백종원 레시피', component: BlogReceipe, icon: ''}
            , {title: '강식당 레시피', component: KangListPage, icon: ''}
            , {title: '윤식당 레시피', component: YoonListPage, icon: ''}
            , {title: '혼밥 레시피', component: HbListPage, icon: ''}
            , {title: '냉장고를부탁해 레시피', component: NbListPage, icon: ''}
            , {title: '좋아요한 레시피', component: JjimListPage, icon: 'thumbs-up'}
            , {title: '설정', component: Setting, icon: 'gear'}
            , {title: '앱정보', component: AboutPage, icon: ''}

            /*, {title: 'Upcomming Fight Card', component: FightCard2Page}*/
        ];

        events.subscribe('user:logined', (user: any, time) => {

            // alert(date);

            let userData: any = this.localstorageservice.get('userData');
            if (userData != null) {

                this.userImage = userData.picture;
                this.userName = userData.first_name;

                this.nav.setRoot(KangListPage)
            } else {
                this.userImage = 'assets/imgs/avatar01.png';
                this.userName = '';
            }


        });


        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need

            platform.registerBackButtonAction(() => {

                if (this.nav.canGoBack()) {
                    this.nav.pop();
                } else {
                    if (this.alert) {
                        this.alert.dismiss();
                        this.alert = null;
                    } else {
                        this.showAlert();
                    }
                }
            });
        });


    }

    showAlert() {
        this.alert = this.alertCtrl.create({
            title: 'Really?',
            message: '진짜 나가시게요?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        this.alert = null;
                    }
                },
                {
                    text: 'Exit',
                    handler: () => {
                        this.platform.exitApp();
                    }
                }
            ]
        });
        this.alert.present();
    }

    showToast() {
        let toast = this.toastCtrl.create({
            message: 'Press Again to exit',
            duration: 2000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }


    initializeApp() {

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();


        });
    }


    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component, {'fromNavBar': true});
    }
}
