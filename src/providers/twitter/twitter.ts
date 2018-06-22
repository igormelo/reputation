import { Injectable } from '@angular/core';
import { TwitterService } from 'ng2-twitter';
import 'rxjs/add/operator/map';
/*
  Generated class for the TwitterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TwitterProvider {
  token = null;
  tokenSecret = null;
  consumerKey = '2PbGtQGmKle7Mh2fJGrPPe8ZH';
  consumerSecret = 'MEEkWhJut5w3Q8J42K5nULPvKtAPBhrUPz9d59EWmTj2D3hdkS';
  constructor(private twitter: TwitterService) {

  }
  setTokens(token, tokenSecret) {
    this.token = token;
    this.tokenSecret = tokenSecret;
  }

  postTweet(text) {
    return this.twitter.post(
      'https://api.twitter.com/1.1/statuses/update.json',
      {
        status: text
      },
      {
        consumerKey: this.consumerKey,
        consumerSecret: this.consumerSecret
      },
      {
        token: this.token,
        tokenSecret: this.tokenSecret
      }
    )
      .map(res => res.json());
  }
  getHomeTimeline() {
    return this.twitter.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      {
        count: 10
      },
      {
        consumerKey: this.consumerKey,
        consumerSecret: this.consumerSecret
      },
      {
        token: this.token,
        tokenSecret: this.tokenSecret
      }
    )
      .map(res => res.json());
  };

}
