import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import {HttpProvider} from "../../providers/http/http";
import {HttpClient} from "@angular/common/http";

import {InAppBrowser} from "@ionic-native/in-app-browser";


@IonicPage()
@Component({
    selector: 'receipe-list',
    templateUrl: 'receipe-list.html',
})
export class ReceipeListPage {

    results: any = [];
    title: string;
    totalCount :number= 0;
    page : number = 1;
    totalPage = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, public httpProvider: HttpProvider
        , public httpclient: HttpClient
        , public loadingCtrl: LoadingController
        , private   iab: InAppBrowser) {

        let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            spinner: 'dots'
        });
        loading.present();
        this.httpclient.get('http://checkout-express.appspot.com/jibbob_list/1').subscribe((res: any) => {


            let receipesList = res.result.receipes;
            console.log('#####################' + JSON.stringify(receipesList));
            this.results = receipesList;
            this.totalCount = res.result.count;

            this.totalPage = Math.ceil(this.totalCount /10);

            loading.dismissAll();

            this.page = this.page+ 1;

        })
    }

    doInfinite(infiniteScroll) {

      //  alert(this.page);

        if ( this.totalPage < this.page){
            console.log('Async operation has ended');
            infiniteScroll.complete();
            return false;
        }else{
            setTimeout(() => {
                this.httpclient.get('http://checkout-express.appspot.com/jibbob_list/'+ this.page).subscribe((res: any) => {

                    const _tempResult = [];

                    let receipesList = res.result.receipes;
                    console.log('#####################' + JSON.stringify(res.result));

                    for ( let i=0; i<receipesList.length;i++){
                        this.results.push(receipesList[i]);
                    }

                    this.page= this.page+1;

                })

                console.log('Async operation has ended');
                infiniteScroll.complete();
            }, 500);
        }


    }


   /* clickedEvent(item) {
        this.navCtrl.push(FightCard2Page, {
            url: item.url,
            title: item.title
        });
    }*/

    clickedItem(url) {

        var browser = this.iab.create(url, '_blank', 'location=no,toolbar=no');
    }

}
