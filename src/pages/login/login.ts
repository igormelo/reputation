import { Component } from '@angular/core';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { IonicPage, NavController, AlertController, LoadingController, Loading,NavParams } from 'ionic-angular';
import { TwitterProvider } from '../../providers/twitter/twitter';
import { TimelinePage } from '../timeline/timeline';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  constructor(public navCtrl: NavController, private twitter: TwitterConnect, private twitterProvider: TwitterProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController,public nativeStorage: NativeStorage) {
  }

  public loginWithTwitter() {
    let nav = this.navCtrl;
    this.showLoading();
    this.twitter.login().then((data) => {
      this.twitterProvider.setTokens(data.token, data.secret);
      this.nativeStorage.setItem('twitter_user',{
        token: data.token,
        secret: data.secret
      }).then(()=>{
        this.loading.dismiss().then(() => {
          nav.push(HomePage);
          this.loading.dismiss();
        });
      }, error => {
        this.showError(error);
        this.loading.dismiss();
      });
      })
  }
 
  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  private showError(text) {
    this.loading.dismiss().then(() => {
      let alert = this.alertCtrl.create({
        title: 'Fail',
        message: text + '\nMake sure to setup Twitter account on your device.',
        buttons: ['OK']
      });
      alert.present();
    });
  }
 
}
