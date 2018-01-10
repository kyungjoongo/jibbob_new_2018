import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BlogReceipe} from "../pages/octagon-girls/blog-receipe";
import {AdMobPro} from "@ionic-native/admob-pro";
import {ReceipeListPage} from "../pages/fight-event-list/receipe-list";
import {AboutPage} from "../pages/about/about";
import {NbListPage} from "../pages/nb-list/nb-list";
import {HbListPage} from "../pages/hb-list/hb-list";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = BlogReceipe;
    //rootPage: any = TitleHolderPage

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private admob: AdMobPro) {
        platform.ready().then(() => {

            var admobid = {
                interstitial: 'ca-app-pub-6826082357124500/9307296734',
                banner: 'ca-app-pub-6826082357124500/7593091515'


            };
            this.admob.prepareInterstitial({
                adId: admobid.interstitial,
                isTesting: false
                , autoShow: true

            })

            // this.admob.showInterstitial();

            this.admob.createBanner({
                adId: admobid.banner,
                isTesting: false,
                autoShow: true,
                position: this.admob.AD_POSITION.BOTTOM_CENTER
            })


        });


        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            /*{title: 'Fight Card', component: HomePage},*/
            {title: '백종원 레시피', component: BlogReceipe}
            ,{title: '냉장고를부탁해 레시피', component: NbListPage}
            ,{title: '혼밥 레시피', component: HbListPage}
            ,{title: '앱정보', component: AboutPage}
            /*, {title: 'Upcomming Fight Card', component: FightCard2Page}*/


        ];


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
        this.nav.setRoot(page.component);
    }
}
