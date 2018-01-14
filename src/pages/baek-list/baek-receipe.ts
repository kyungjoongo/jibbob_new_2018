import {Component} from '@angular/core';
import {
    IonicPage, LoadingController, NavController, NavParams, Platform, PopoverController,
    ToastController
} from 'ionic-angular';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from 'angular-2-local-storage';
import {CommentPage} from "../comment/comment";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {AdMobPro} from "@ionic-native/admob-pro";


@IonicPage()
@Component({
    selector: 'page-baek-list',
    template:`
        <ion-header>
            <ion-navbar color="clova" class="">
                <button ion-button menuToggle>
                    <ion-icon name="menu"></ion-icon>
                </button>
                <ion-title>백종원 레시피</ion-title>
            </ion-navbar>
        </ion-header>


        <ion-content class="home">
            <div class="my-overlay" padding [hidden]="overlayHidden">
                <button full (click)="hideOverlay()">Click me</button>
            </div>

            <div class="card001" *ngFor="let item of results; let i= index"
                 style="background: rgba(0,0,0,0);padding: 0px!important;">

                <ion-row style="text-align: center; padding: 0px;">
                    <ion-col col-12 style="padding: 0px;">
                        <div *ngIf="item.thumbnail != ''; else elseBlock">
                            <img class="" [src]="item.thumbnail" style="width: 360px;height: 360px;" (click)="clickedItem(item.url)" />
                        </div>
                        <ng-template #elseBlock>
                            <img src="http://via.placeholder.com/360x360"/>
                        </ng-template>
                        <div class="text001" >
                            <div [innerHTML]="item.title"></div>
                        </div>
                    </ion-col>
                </ion-row>


                <ion-row>
                    <ion-col>
                        <button color='dark' ion-button icon-left clear small (click)="clickedHeart(item, i)">
                            <ion-icon name="thumbs-up" [ngClass]="{'heart': selectedIndex[i]}"></ion-icon>
                            <div [ngClass]="{'heart': selectedIndex[i]}">Likes</div>
                        </button>
                    </ion-col>
                    <ion-col>
                        <button color="dark" ion-button icon-left clear small (click)="goComment(item)">
                            <ion-icon name="text"></ion-icon>
                            <div> Comments</div>
                        </button>
                    </ion-col>
                </ion-row>
            </div>
            <ion-infinite-scroll (ionInfinite)="doInfinite($event)" threshold="500px">
                <ion-infinite-scroll-content loadingSpinner="dots" ></ion-infinite-scroll-content>
            </ion-infinite-scroll>


        </ion-content>

    `
})
export class BaekReceipePage {


    results: any = [];
    title: string;
    totalCount: number = 0;
    page: number = 1;
    totalPage = 0;
    selectedIndex = [];

    naver_url = "https://checkout002-191623.appspot.com/blog_list?query=백종원 부탁해 레시피&page=";

    local_naver_url = "http://kyungjoon.ipdisk.co.kr:5000/blog_list?query=백종원 부탁해 레시피&page=";

    saved_items: any = [];
    overlayHidden: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public httpclient: HttpClient
        , private toastCtrl: ToastController
        , public loadingCtrl: LoadingController
        , public localstorageservice: LocalStorageService
        , public popoverCtrl: PopoverController
        , public platform: Platform
        , private admob: AdMobPro
        , public commonserviceprovider: CommonServiceProvider
        , private   iab: InAppBrowser) {


        if (!this.navParams.get('fromNavBar')) {
            this.getAdMob();
        }


        let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            spinner: 'dots'
        });
        loading.present();
        this.httpclient.get(this.naver_url + this.page).subscribe((res: any) => {

            let receipesList = res;
            this.results = receipesList;
            this.page = this.page + 1;
            loading.dismissAll()

        });
        let _tempSavedItems = this.localstorageservice.get('savedReceipe');
        Array.prototype.push.apply(this.saved_items, _tempSavedItems);


    }

    doInfinite(infiniteScroll) {

        this.httpclient.get(this.naver_url + this.page).subscribe((res: any) => {
            console.log('###############' + this.page);
            let receipesList = res;
            for (let i = 0; i < receipesList.length; i++) {
                this.results.push(receipesList[i]);
            }
            this.page = this.page + 1;

            infiniteScroll.complete();
        })
    }


    clickedItem(url) {
        this.iab.create(url, '_blank', 'location=no,toolbar=yes');
    }


    clickedHeart(item, index) {
        this.selectedIndex[index] = !this.selectedIndex[index]
        this.saved_items.push(item);
        this.localstorageservice.set('savedReceipe', this.saved_items);
        this.presentToast();
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: '찜 되었습니다~~!',
            duration: 1500,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();

    }

    getAdMob() {

        this.platform.ready().then(() => {

            if (this.platform.is('cordova')) {

                let admobid = {
                    interstitial: 'ca-app-pub-6826082357124500/9307296734',
                    banner: 'ca-app-pub-6826082357124500/7593091515'
                };

                this.admob.prepareInterstitial({
                    adId: admobid.interstitial,
                    isTesting: false
                    , autoShow: true

                }).then(() => {
                    this.admob.createBanner({
                        adId: admobid.banner,
                        isTesting: false,
                        autoShow: true,
                        position: this.admob.AD_POSITION.BOTTOM_CENTER
                    })
                })
            }
        });
    }


    goComment(item) {
        let _title = item.title;
        _title = _title.replace("#", "").replace("$", "").replace("$", "");
        _title = _title.replace("[", "");
        _title = _title.replace("]", "");
        this.navCtrl.push(CommentPage, {'title': _title, 'image': item.thumbnail}).then(()=>{

        }).catch(err=>{
            alert(err);
        })
    }





}
