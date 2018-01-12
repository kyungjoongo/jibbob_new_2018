import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';



@IonicPage()
@Component({
    selector: 'page-popover1',
    template: `
        <ion-list>
            <ion-list-header>Ionic</ion-list-header>
            <button ion-item (click)="close()">Learn Ionic</button>
            <button ion-item (click)="close()">Documentation</button>
            <button ion-item (click)="close()">Showcase</button>
            <button ion-item (click)="close()">GitHub Repo</button>
        </ion-list>
    `
})
export class Popover1Page {

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Popover1Page');
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
