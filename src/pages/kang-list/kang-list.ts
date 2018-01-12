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
    selector: 'page-kang-list',
    templateUrl: 'kang-list.html',
})
export class KangListPage {


    results: any = [];
    title: string;
    totalCount: number = 0;
    page: number = 1;
    totalPage = 0;
    selectedIndex = [];
    nb_url = "http://kyungjoon.ipdisk.co.kr:5000/r_list?receipeName=강식당 레시피&page=";
    cloud_url = 'http://checkout002-191623.appspot.com/r_list?receipeName=강식당 레시피&page=';

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


        this.initializeApp();

        let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            spinner: 'dots'
        });
        loading.present();
        this.httpclient.get(this.cloud_url + this.page).subscribe((res: any) => {


            let receipesList = res.result.blog_list;
            //console.log('#####################' + JSON.stringify(receipesList));
            this.results = receipesList;
            this.totalCount = res.result.count;

            this.totalPage = Math.ceil(this.totalCount / 10);

            this.page = this.page + 1;
            loading.dismissAll()

        });
        let _tempSavedItems = this.localstorageservice.get('savedReceipe');
        Array.prototype.push.apply(this.saved_items, _tempSavedItems);


    }

    doInfinite(infiniteScroll) {


        if (this.totalPage < this.page) {
            infiniteScroll.complete();
            return false;
        } else {

            this.httpclient.get(this.cloud_url + this.page).subscribe((res: any) => {
                console.log('###############' + this.page);
                let receipesList = res.result.blog_list;
                for (let i = 0; i < receipesList.length; i++) {
                    this.results.push(receipesList[i]);
                }
                this.page = this.page + 1;

                infiniteScroll.complete();


            })


        }


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


    initializeApp() {

    }


    goComment(item) {
        let _title = item.title;
        _title = _title.replace("#", "").replace("$", "").replace("$", "");
        _title = _title.replace("[", "");
        _title = _title.replace("]", "");
        this.navCtrl.push(CommentPage, {'title': _title, 'image': item.image})
    }


}
