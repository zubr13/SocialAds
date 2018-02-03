import { Component, OnInit } from '@angular/core';
import {FacebookService} from 'ng2-facebook-sdk';
import { AuthService } from '../shared/services/auth.service';
import { DatabaseService } from '../shared/services/database.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateAdComponent implements OnInit {
  friendsCount: number;
  profit: number

  constructor(private fb: FacebookService, 
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

  onUpload () {
    
  }
}
