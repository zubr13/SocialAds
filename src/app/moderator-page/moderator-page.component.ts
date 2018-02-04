import { Component, OnInit } from '@angular/core';
import {AdRequest} from '../my-ads/my-ads.component';
import {DatabaseService} from '../shared/services/database.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from "firebase";

@Component({
  selector: 'app-moderator-page',
  templateUrl: './moderator-page.component.html',
  styleUrls: ['./moderator-page.component.scss']
})
export class ModeratorPageComponent implements OnInit {

  ads: Array<AdRequest> = [];

  db;

  constructor(private dbService: DatabaseService) {
    this.db = this.dbService.database;
  }

  ngOnInit() {

    Observable.fromPromise(this.db.ref('/ad-request').once('value'))
      .map((snapshot: firebase.database.DataSnapshot) => snapshot.val())
      .subscribe(adRequests => {
        this.ads = Object.keys(adRequests)
          .filter(key => !adRequests[key].isChecked)
          .map(key => ({...adRequests[key], id: key }));
      });

  }

  approve(id): void {
    this.db.ref(`ad-request/${id}`).update({
      isChecked: true,
      isApproved: true,
    });
    this.ads = this.ads.filter(el => el['id'] !== id);
  }

  decline(id): void {
    this.db.ref(`ad-request/${id}`).update({
      isChecked: true,
      isApproved: false,
    });
    this.ads = this.ads.filter(el => el['id'] !== id);
  }

}
