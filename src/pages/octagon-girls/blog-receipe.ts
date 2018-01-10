import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";
import {HttpClient} from "@angular/common/http";
import {InAppBrowser} from "@ionic-native/in-app-browser";



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

    /*cloud_url = 'http://checkout-express.appspot.com/jibbob_list/1';

    cloud_url = 'http://checkout002-191623.appspot.com/jibbob_list/';*/

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public httpclient: HttpClient
        , public loadingCtrl: LoadingController
        , private   iab: InAppBrowser) {

        let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            spinner: 'dots'
        });
        loading.present();
        this.httpclient.get('http://checkout-express.appspot.com/jibbob_blog_list/' + this.page).subscribe((res: any) => {


            let receipesList = res.result.blog_list;
            console.log('#####################' + JSON.stringify(receipesList));
            this.results = receipesList;
            this.totalCount = res.result.count;

            this.totalPage = Math.ceil(this.totalCount / 10);

            this.page = this.page + 1;
            loading.dismissAll()

        })
    }

    doInfinite(infiniteScroll) {


        if (this.totalPage < this.page) {
            infiniteScroll.complete();
            return false;
        } else {

            this.httpclient.get('http://checkout-express.appspot.com/jibbob_blog_list/' + this.page).subscribe((res: any) => {
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
    }
}
