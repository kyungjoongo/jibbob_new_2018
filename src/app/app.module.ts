import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpModule} from "@angular/http";
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {BlogReceipe} from "../pages/octagon-girls/blog-receipe";
import {HttpClientModule} from "@angular/common/http";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpProvider} from '../providers/http/http';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {AdMobPro} from "@ionic-native/admob-pro";
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {AboutPage} from "../pages/about/about";
import {NbListPage} from "../pages/nb-list/nb-list";
import {HbListPage} from "../pages/hb-list/hb-list";
import {KangListPage} from "../pages/kang-list/kang-list";
import {YoonListPage} from "../pages/yoon-list/yoon-list";
import {LocalStorageModule} from 'angular-2-local-storage';
import {JjimListPage} from "../pages/jjim-list/jjim-list";
import {CommentPage} from "../pages/comment/comment";
import {Setting} from "../pages/login/setting";
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {MomentModule} from 'angular2-moment';
import {CommonServiceProvider} from '../providers/common-service/common-service';
import {LoginMainPage} from "../pages/login-main/login-main";

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyDRVo1wr-RaUunewZaHiIJ-jEXjXYOaDR8",
    authDomain: "kang-sickdang.firebaseapp.com",
    databaseURL: "https://kang-sickdang.firebaseio.com",
    projectId: "kang-sickdang",
    storageBucket: "kang-sickdang.appspot.com",
    messagingSenderId: "68668836174"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        BlogReceipe,
        AboutPage, NbListPage, HbListPage, KangListPage, YoonListPage, JjimListPage, CommentPage, Setting, LoginMainPage
    ],
    imports: [
        HttpModule,
        BrowserModule, HttpClientModule,
        IonicModule.forRoot(MyApp),
        LocalStorageModule.withConfig({
            prefix: 'my-app001',
            storageType: 'localStorage'
        }),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule, MomentModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        BlogReceipe, AboutPage, NbListPage, HbListPage, KangListPage, YoonListPage, JjimListPage, CommentPage, Setting
        , LoginMainPage
    ],


    providers: [
        StatusBar, YoutubeVideoPlayer, AdMobPro,
        SplashScreen, HttpProvider, InAppBrowser, /*AngularFireDatabase,*/
        {provide: ErrorHandler, useClass: IonicErrorHandler}, Facebook, AngularFireDatabase,
        CommonServiceProvider
    ]
})
export class AppModule {
}
