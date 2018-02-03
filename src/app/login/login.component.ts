import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {FacebookAuth} from "../shared/services/authMethods/facebook";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isSignedIn: boolean = false;

  public userData;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private facebookAuth: FacebookAuth
  ) { }

  ngOnInit() {
    this.auth.authState.subscribe(data => {
      console.log(data);
      if(data == null) {
        this.isSignedIn = false;
      } else {
        this.isSignedIn = true;
        this.userData = data;
      }
    });
  }

  facebookLogin(){
    this.facebookAuth.login().then((data) => {
      this.authService.facebookToken = data.credential.accessToken;
      console.log(data);
      localStorage.setItem('facebookToken', this.authService.facebookToken);
      this.router.navigate(['/app/profile']);
    });
  }
}
