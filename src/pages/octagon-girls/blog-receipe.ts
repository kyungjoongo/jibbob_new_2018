import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";
import {HttpClient} from "@angular/common/http";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {LocalStorageService} from "angular-2-local-storage";
import {CommentPage} from "../comment/comment";



@IonicPage()
@Component({
    selector: 'blog-receipe',
    templateUrl: 'blog-receipe.html',
})
export class BlogReceipe {
    results: any = [];
    title: string;
    totalCount: number = 0;
    page: number = 1;
    totalPage = 0;
    selectedIndex = [];

    nb_url = "http://kyungjoon.ipdisk.co.kr:5000/r_list?receipeName=백종원 레시피&page=";
    cloud_url = 'http://checkout002-191623.appspot.com/r_list?receipeName=백종원 레시피&page=';

    saved_items: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public httpclient: HttpClient
        , public loadingCtrl: LoadingController
        , public localstorageservice: LocalStorageService
        , private   iab: InAppBrowser) {

        let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            spinner: 'dots'
        });
        loading.present();
        this.httpclient.get(this.cloud_url + this.page).subscribe((res: any) => {


            let receipesList = res.result.blog_list;
            console.log('#####################' + JSON.stringify(receipesList));
            this.results = receipesList;
            this.totalCount = res.result.count;

            this.totalPage = Math.ceil(this.totalCount / 10);

            this.page = this.page + 1;
            loading.dismissAll()

        })

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
        var browser = this.iab.create(url, '_blank', 'location=no,toolbar=yes');
    }


    clickedHeart(item, index) {
        this.selectedIndex[index] = !this.selectedIndex[index]
        this.saved_items.push(item);
        this.localstorageservice.set('savedReceipe', this.saved_items);
    }


    goComment(item) {
        let _title = item.title;
        _title = _title.replace("#", "").replace("$", "").replace("$", "");
        _title = _title.replace("[", "");
        _title = _title.replace("]", "");
        this.navCtrl.push(CommentPage, {'title': _title, 'image': item.image})
    }

}
