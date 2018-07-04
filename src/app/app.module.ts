import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TwitterService } from 'ng2-twitter';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TwitterProvider } from '../providers/twitter/twitter';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoginPage } from '../pages/login/login';
import { TimelinePage } from '../pages/timeline/timeline';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TimelinePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TimelinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TwitterService,
    HttpClient,
    TwitterConnect,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TwitterProvider,
    NativeStorage
  ]
})
export class AppModule {}
