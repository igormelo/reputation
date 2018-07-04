import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TimelinePage } from '../pages/timeline/timeline';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, public splashScreen: SplashScreen, public nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      let env = this;
      this.nativeStorage.getItem('twitter_user').then((data)=>{
        env.nav.push(TimelinePage)
        env.splashScreen.hide();
      },(error)=>{
        env.nav.push(LoginPage);
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

