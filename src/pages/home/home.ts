import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { SlicePipe } from '@angular/common';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'


})
export class HomePage {

    result: any;


    loadingImgDiv = this.loadingController.create({ content: '<ion-spinner></ion-spinner>' });


    constructor(public navCtrl: NavController, public httpProvider: HttpProvider
                ,private loadingController : LoadingController
                , private   iab: InAppBrowser) {


        this.loadingImgDiv.present();
        this.httpProvider.getJsonData().subscribe(response => {
            this.result = response.result;

            this.loadingImgDiv.dismiss();
        });


    }

    goFightCard(eventId) {

        alert(eventId);
        let browser = this.iab.create('http://ufc-data-api.ufc.com/api/v1/us/events/'+ eventId, '_blank', 'location=no,toolbar=no');

    }

}
