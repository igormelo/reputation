import { Component } from '@angular/core';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { IonicPage, NavController, AlertController, LoadingController, Loading,NavParams } from 'ionic-angular';
import { TwitterProvider } from '../../providers/twitter/twitter';
import { TimelinePage } from '../timeline/timeline';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  constructor(public navCtrl: NavController, private twitter: TwitterConnect, private twitterProvider: TwitterProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  public loginWithTwitter() {
    this.showLoading();
    this.twitter.login().then((data) => {
      this.twitterProvider.setTokens(data.token, data.secret);
      this.loading.dismiss().then(() => {
        this.navCtrl.setRoot(TimelinePage);
      });
    }, error => {
      this.showError(error);
    });
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
