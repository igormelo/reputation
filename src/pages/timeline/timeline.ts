import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { TwitterProvider } from '../../providers/twitter/twitter';
import { Observable } from 'rxjs/Observable';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  tweets: Observable<any[]>;
  loading: Loading;
  constructor(public navCtrl: NavController, private twitterProvider: TwitterProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private iab: InAppBrowser, public nativeStorage: NativeStorage) {
  }

  ionViewWillEnter() {
    this.nativeStorage.getItem('twitter_user').then((data)=>{
      this.loadTimeline(data);
    })
  }

  public loadTimeline(refresher?) {
    this.showLoading();
    this.tweets = this.twitterProvider.getHomeTimeline(refresher.token, refresher.secret);
    this.tweets.subscribe(data => {
      this.loading.dismiss();
      refresher.complete();
    }, err => {
      refresher.complete();
      this.showError(err);
    });
  }

  public composeTweet() {
    let prompt = this.alertCtrl.create({
      title: 'Novo tweet',
      message: "Escreva sua mensagem",
      inputs: [
        {
          name: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Tweet',
          handler: data => {
            this.nativeStorage.getItem('twitter_user').then((dado)=>{
              this.postTweet(data.text, dado.secret, dado.token);
            }) 
          }
        }
      ]
    });
    prompt.present();
  }
  public dateForTweet(dateString) {
    let d = new Date(Date.parse(dateString));
 
    // http://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
 
    return datestring;
  }
  public openLinkUrl(url) {
    let browser = this.iab.create(url, 'blank');
  }

  public postTweet(text, token,secret) {
    this.showLoading();
    this.twitterProvider.postTweet(text,token,secret).subscribe(res => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Tweet posted!',
        duration: 3000
      });
      toast.present();
    }, err => {
      this.showError(err);
    });
  }


  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
  }

  private showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Error',
      message: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
