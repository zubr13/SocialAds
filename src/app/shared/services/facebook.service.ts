import {Injectable} from '@angular/core';
import {FacebookService} from 'ng2-facebook-sdk';
import {AuthService} from "./auth.service";
import {ReplaySubject, Observable} from "rxjs";

@Injectable()
export class FacebookAppService {
  private initialzed: boolean = false;
  constructor(private fb: FacebookService,
              private auth: AuthService) {
    auth.authStatus().subscribe(auth => {
      if (auth && auth.currentUser && auth.currentUser.providerData[0].providerId.indexOf('facebook') !== -1) {
        this.init();
      }
    })
  }

  init() {
    return Observable.fromPromise(this.fb.init({
      appId: '1955507991402224',
      version: 'v2.9'
    }).then(data => this.initialzed = true));
  }

  searchEvents(query: Object, recursionLimit: number) {
    console.group('Request to facebook api'.toUpperCase());
    console.info('query=', query);
    console.log('recursionLimit=', recursionLimit);
    console.groupEnd();

    const stringify = obj => Object.keys(obj).reduce((acc, key) => acc += `${key}=${obj[key]}&`, '');

    const subject: ReplaySubject<any> = new ReplaySubject();
    const promise = !this.initialzed ? this.init() : Promise.resolve();

    (promise as Promise<any>)
      .then(() => this.fb.api(`/search?${stringify(query)}access_token=${this.auth.facebookToken}`))
      .then(fbEvents => {
        let counter = 0;
        const request = (d = fbEvents['paging']['next']) => this.fb.api(d)
          .then(data => {
            if (!data.paging || !data['paging']['next'] || counter > recursionLimit) {
              subject.complete();
            } else {
              subject.next(data.data);
              ++counter;
              request(data.paging.next);
            }
          }).catch(err => subject.error(err));
        request();
      })
      .catch(err => subject.error(err));
    return subject.reduce((acc, arr) => acc.concat(arr));
  }

  postFile(fileUrl: string) {
    console.log(fileUrl);
    return Observable.fromPromise(this.fb.api(`/me/feed?access_token=${this.auth.facebookToken}`, 'post', { link: fileUrl, message: 'Test test test'}));
  }

  getPosts(): Observable<any>{
    return Observable.fromPromise(this.fb.api(`/me/posts`));
  }
}
