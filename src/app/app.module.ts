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
import {ReceipeListPage} from "../pages/fight-event-list/receipe-list";
import { AboutPage} from "../pages/about/about";
import { NbListPage} from "../pages/nb-list/nb-list";
import { HbListPage} from "../pages/hb-list/hb-list";
import { KangListPage} from "../pages/kang-list/kang-list";
import { YoonListPage} from "../pages/yoon-list/yoon-list";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        BlogReceipe,
         ReceipeListPage,AboutPage, NbListPage,HbListPage, KangListPage,YoonListPage
    ],
    imports: [
        HttpModule,
        BrowserModule,HttpClientModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        BlogReceipe, ReceipeListPage,AboutPage, NbListPage, HbListPage, KangListPage, YoonListPage
    ],


    providers: [
        StatusBar, YoutubeVideoPlayer,AdMobPro,
        SplashScreen, HttpProvider, InAppBrowser,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    ]
})
export class AppModule {
}
