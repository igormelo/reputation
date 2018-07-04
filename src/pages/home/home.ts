import { Component } from '@angular/core';
import { NavController,AlertController, ToastController } from 'ionic-angular';
import { TwitterProvider } from '../../providers/twitter/twitter';
import { TwitterConnect } from '@ionic-native/twitter-connect';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private twitterProvider: TwitterProvider, private alertCtrl: AlertController, private toastCtrl: ToastController, private twitter: TwitterConnect) {

  }

  public loginWithTwitter() {

    this.twitter.login().then((data) => {
        this.twitterProvider.setTokens(data.token, data.secret);
    }, error => {
      this.showError(error);
    });
  }

  public composeTweet() {
    let prompt = this.alertCtrl.create({
      title: 'New Tweet',
      message: "Escreva sua mensagem",
      inputs: [
        {
          name: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Tweet',
          handler: data => {
            //this.postTweet(data.text + "message from TWEETAPP");
          }
        }
      ]
    });
    prompt.present();
  }

  // public postTweet(text) {
  //   this.twitterProvider.postTweet(text).subscribe(res => {
      
  //     let toast = this.toastCtrl.create({
  //       message: 'Tweet posted!',
  //       duration: 3000
  //     });
  //     toast.present();
  //   }, err => {
      
  //   });
  // }
  private showError(text) {
      let alert = this.alertCtrl.create({
        title: 'Fail',
        message: text + '\nMake sure to setup Twitter account on your device.',
        buttons: ['OK']
      });
      alert.present();
  }

}
