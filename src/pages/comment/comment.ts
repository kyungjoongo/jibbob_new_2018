import {Component} from '@angular/core';
import {IonicPage, LoadingController, LoadingOptions, NavController, NavParams, ViewController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
/*import {AngularFireDatabase, AngularFireList,  } from 'angularfire2/database';*/
import {Observable} from "rxjs/Observable";
import {FirebaseListObservable, AngularFireDatabase} from "angularfire2/database-deprecated";
import {Product} from "../shared/Product";
import {LocalStorageService} from "angular-2-local-storage";


@IonicPage()
@Component({
    selector: 'page-comment',
    templateUrl: 'comment.html'
})
export class CommentPage {
    title: string = ''
    msg: any = [];
    products: Observable<any[]>;
    myDate: any;
    image? : string= '';

    constructor(public navCtrl: NavController
        , public alertcontroller: AlertController
        , public afd: AngularFireDatabase
        , public loadingCtrl: LoadingController
        , public localstorageservice: LocalStorageService
        , public navParams: NavParams, public viewCtrl: ViewController) {

        this.title = this.navParams.get('title');
        this.image = this.navParams.get('image');

        this.msg = {
            content: 'Am I dreaming?',
            position: 'left',
            time: '12/3/2016',
            senderName: 'Gregory'
        };

        this.getProducts();

        this.myDate = new Date();
    }

    getProducts() {
      /*  let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            spinner: 'dots'
        });

        loading.present();*/
        this.products = this.afd.list('receipe_' + this.title);

        /*setTimeout(()=>{
            loading.dismissAll()
        },500)*/
    }

    deleteItem(item) {
        let userData: any = this.localstorageservice.get('userData');

        let savedLocalstorageUserId = '';
        if (userData == undefined) {
            savedLocalstorageUserId = '';
        } else {
            savedLocalstorageUserId = userData.user_id;
        }

        console.log('###############' + item.user_id);
        console.log('###############' + savedLocalstorageUserId);

        if (item.user_id == savedLocalstorageUserId && savedLocalstorageUserId != '') {
            this.afd.list('receipe_' + this.title).remove(item.$key);
        } else {
            alert('본인글만 지울수 있습니다');
        }

    }


    insertData(comment) {
        let userData: any = this.localstorageservice.get('userData');
        let picture: any;
        let username: any = '';
        let user_id: any = '';
        if (userData == undefined) {
            picture = 'assets/imgs/avatar01.png';
        } else {
            picture = userData.picture;
            username = userData.first_name;
            user_id = userData.user_id;
        }

        this.myDate = new Date();


        this.afd.list('receipe_' + this.title).push({
            comment: comment,
            picture: picture,
            username: username,
            date: this.myDate,
            user_id: user_id
        });
    }


    clickedFab() {
        this.presentPrompt();
    }

    presentPrompt() {
        let alert = this.alertcontroller.create({
            title: '코멘트',
            inputs: [
                {
                    name: 'comment',
                    placeholder: 'Comment'
                }

            ],
            buttons: [
                {
                    text: '취소',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '저장',
                    handler: data => {
                        console.log('###############' + JSON.stringify(data.comment));
                        this.insertData(data.comment)
                    }
                }
            ]
        });
        alert.present();
    }


}
