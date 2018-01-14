import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, RequestOptions} from "@angular/http";
import { HttpClient} from "@angular/common/http";

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

    remoteUri: String = 'https://ufc-rest2.herokuapp.com/';
    apiKey = 'AIzaSyCUMLRaMiBgIcQiOwR--735jG-Dhgvg8B8';


    /*
                        'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6'
                        , 'Content-Type': 'application/json;charset=UTF-8'
                    encoding: null,
                    uri: 'https://dapi.kakao.com/v2/search/blog?query='+ encodedQuery+ '&page='+ page +  '&size=20',
    */
    encodedQuery = '강식당 레시피';
    page = 1;
    daum_uri = 'https://dapi.kakao.com/v2/search/blog?query=' + this.encodedQuery + '&page=' + this.page + '&size=20';

    url: string = this.remoteUri + 'getUfcGameList';
    result: any;

    constructor(public http: Http, public httpClient: HttpClient) {
        this.getFighters();
    }

    getDaumJsonData(query = '강식당 레시피', page = 1) {


        /*let headers = new Headers();
        headers.append('Authorizationt', 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6');*/

        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorizationt', 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6');
        headers.append('Access-Control-Allow-Origin', '*');
        let options: RequestOptions = new RequestOptions({ headers: headers });

        this.result = this.http.get('https://dapi.kakao.com/v2/search/blog?query=' + query + '&page=' + page + '&size=20', options).map(res => {

            let jsonResult = res.json();
            console.log(jsonResult);
            return jsonResult;

        });

        return this.result;
    }


    getOctagonGirlData() {

        this.result = this.http.get('https://ufc-rest2.herokuapp.com//getOctagonGirls').map(res => {
            let jsonResult = res.json();
            console.log(jsonResult);
            return jsonResult;

        });

        return this.result;
    }


    getFighters() {
        this.result = this.http.get(this.remoteUri + "getFighters").map(res => {
            let jsonResult = res.json();
            console.log(jsonResult);
            return jsonResult;

        });
        return this.result;
    }


    getFightersByName(searchTerm) {
        this.result = this.http.get(this.remoteUri + "getFightersByName/" + searchTerm).map(res => {
            let jsonResult = res.json();
            console.log(jsonResult);
            return jsonResult;

        });
        return this.result;
    }

    /*https://ufc-rest2.herokuapp.com/getFightersByName/k*/

    getFightersDetail(id) {

        this.result = this.http.get(this.remoteUri + "getFighters/" + id).map(res => {
            let jsonResult = res.json();
            console.log(jsonResult);
            return jsonResult;

        });

        return this.result;
    }


    getOctagonGirlDetailData(id) {

        this.result = this.http.get(this.remoteUri + "getOctagonGirls/" + id).map(res => {
            let jsonResult = res.json();
            console.log(jsonResult);
            return jsonResult;

        });

        return this.result;
    }


    /**
     * 채널리스트 fetch
     * @param channel
     */
    getPlaylistsForChannel(channel) {

        var _channel = 'UFC';

        return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20')
            .map((res) => {

                let _items = res.json()['items'];


                for (let entry of _items) {
                    console.log("entry121212-->" + entry); // 1, "string", false
                    console.log("entry-->" + JSON.stringify(entry)); // 1, "string", false
                }


                return res.json()['items'];
            })
    }

    getListVideos(listId) {
        return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId + '&part=snippet,id&maxResults=20')
            .map((res) => {
                return res.json()['items'];
            })
    }


}
