import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../shared/services/database.service';
import {Topic} from '../topics/topics.component';

export interface AdRequest {
  imageUrl: string;
  isApproved: boolean;
  isChecked: boolean;
  timestamp: number;
  topic: Topic;
}

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'rxjs/add/operator/concatMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {

  ads: Array<AdRequest> = [];

  db;

  constructor(private dbService: DatabaseService) {
    this.db = this.dbService.database;
  }

  ngOnInit() {

    const uid = firebase.auth().currentUser.uid;

    Observable.fromPromise(this.db.ref(`users/${uid}/ad-request`).once('value'))
      .map((snapshot: firebase.database.DataSnapshot) => snapshot.val())
      .flatMap(adRequests => {
        if (!!adRequests) {
          const ids = Object.values(adRequests);
          console.log(ids);
          return Observable.from(ids);
        } else {
          throw new Error('No ads found');
        }
      })
      .concatMap(id => Observable.fromPromise(
        this.db.ref(`ad-request/${id}`).once('value'))
          .map((s: any) => ({...s.val(), id})))
      .subscribe(ads => {
        this.ads.push(ads);
      }, (e) => console.log(e));
  }

}
