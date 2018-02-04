import { Component, OnInit } from '@angular/core';
import {FacebookService} from 'ng2-facebook-sdk';
import { AuthService } from '../shared/services/auth.service';
import { DatabaseService } from '../shared/services/database.service';
import {StorageService} from "../shared/services/storage.service";
import {FacebookAppService} from "../shared/services/facebook.service";

import * as firebase from 'firebase';
import 'firebase/auth';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateAdComponent implements OnInit {
  friendsCount: number;
  profit: number;
  imageUrl: string;

  constructor(private fb: FacebookService,
              private storage: StorageService,
              private facebook: FacebookAppService,
              private authService: AuthService,
              private db: DatabaseService) { }

  ngOnInit() {
    this.fb.init({
      appId: '115680942582710',
      version: 'v2.12'
    }).then( data => {
      this.getFriends()
        .then(() => {
          this.profit = this.calculateProfit(this.friendsCount, this.db.topic.rate);
        });
    });
  }

  getImage () {

  }

  getFriends() {
    return this.fb.api(`/me?fields=friends&access_token=${this.authService.facebookToken}`)
      .then((res: any) => {
        this.friendsCount = res.friends.summary['total_count'];
      })
      .catch((error) => console.log(error));
  }

  calculateProfit (friendsCount, rate) {
    return friendsCount * rate;
  }

  onUpload (event) {
    const file = event.target.files[0];
    console.log(file);
    this.storage.uploadFile(file, `${this.guid()}${file.name}`, 'uploads')
      .flatMap(data => {
        console.log(data);
        this.imageUrl = data.downloadURL;
        return this.facebook.init()
          .flatMap(response => this.facebook.postFile(data.downloadURL))
          .map(() => {
            const pushKey = this.db.database.ref('ad-request').push({
              topic: this.db.topic,
              imageUrl: this.imageUrl,
              isApproved: false,
              isChecked: false,
              timestamp: firebase.database.ServerValue.TIMESTAMP,
            }).key;
            this.db.database.ref(`/users/${firebase.auth().currentUser.uid}/ad-request`).push(pushKey);
          });
      })
      .subscribe(data => console.log(data));
  }

  guid() {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
}
