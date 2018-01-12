import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from 'angular-2-local-storage';
import {CommentPage} from "../comment/comment";

/**
 * Generated class for the JjimListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-jjim-list',
    templateUrl: 'jjim-list.html',
})
export class JjimListPage {

    results: any = [];
    title: string;
    totalCount: number = 0;
    page: number = 1;
    totalPage = 0;
    selectedIndex: Array<boolean> = new Array();

    nb_url = 'http://localhost:5000/nb_list/';

    cloud_url = 'http://checkout002-191623.appspot.com/nb_list/';
    saved_items: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public httpclient: HttpClient
        , public loadingCtrl: LoadingController
        , public  localstorageservice: LocalStorageService
        , private   iab: InAppBrowser) {



        this.getSavedItems();

    }

    getSavedItems(){

        this.saved_items = this.localstorageservice.get('savedReceipe');

        if (this.saved_items != null) {

            this.results = this.saved_items.reverse();

            for (let i = 0; i < this.results.length; i++) {
                this.selectedIndex[i] = true;
            }
        }
    }


    clickedItem(url) {
        var browser = this.iab.create(url, '_blank', 'location=no,toolbar=yes');
    }


    clickedHeart(item, index) {
        this.selectedIndex[index] = !this.selectedIndex[index];

        if (confirm('삭제하실래요?')) {

            for (let i = this.results.length - 1; i >= 0; i--) {
                if (this.results[i].title === item.title) {
                    // remove current element
                    this.results.splice(i, 1);
                }
            }

            this.localstorageservice.set('savedReceipe', this.results);

            this.getSavedItems();

        }

    }

    goComment(item) {
        let _title = item.title;
        _title = _title.replace("#", "").replace("$", "").replace("$", "");
        _title = _title.replace("[", "");
        _title = _title.replace("]", "");
        this.navCtrl.push(CommentPage, {'title': _title, 'image': item.image})
    }

}
