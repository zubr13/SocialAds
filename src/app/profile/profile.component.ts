import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FacebookService} from 'ng2-facebook-sdk';
import * as firebase from 'firebase';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentUser;
  public theme: boolean = localStorage.getItem('theme') === 'true';

  constructor(
    private authService: AuthService,
    private fbAuth: AngularFireAuth,
    private fb: FacebookService) {
    console.log(this.theme);
  }

  ngOnInit() {
    console.log(firebase.auth().currentUser);
    this.currentUser = this.fbAuth.auth.currentUser;
    this.fb.init({
      appId: '115680942582710',
      version: 'v2.12'
    }).then( data => {
      this.getFriends();
    });
  }

  getFriends() {
    this.fb.api(`/me?fields=friends&access_token=${this.authService.facebookToken}`)
      .then((res: any) => {
        console.log('Got the users friends', res.friends.summary['total_count']);
      })
      .catch((error) => console.log(error));
  }

  changeColorScheme(value) {
    const [one, two] = [document.getElementById('1'), document.getElementById('2')];
    const swapElements = (elm1, elm2) => {
      const
        parent1 = elm1.parentNode,
        next1   = elm1.nextSibling,
        parent2 = elm2.parentNode,
        next2   = elm2.nextSibling;

      parent1.insertBefore(elm2, next1);
      parent2.insertBefore(elm1, next2);
    };

    value.checked ? swapElements(one, two) : swapElements(two, one);
    localStorage.setItem('theme', value.checked);
  }
}
