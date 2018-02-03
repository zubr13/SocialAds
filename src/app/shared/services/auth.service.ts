import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/first';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DatabaseService} from './database.service';

export interface Roles {
  moderator: boolean;
}

export interface AppUser {
  balance: string | number;
  roles: Roles;
}

@Injectable()
export class AuthService {

  public facebookToken;

  user: BehaviorSubject<AppUser> = new BehaviorSubject<AppUser>(null);

  constructor(private Auth: AngularFireAuth, private dbService: DatabaseService) {
    this.facebookToken = localStorage.getItem('facebookToken');

    this.Auth.authState
      .switchMap(auth => {
        if (auth) {
          return this.dbService.getObject(`users/${auth.uid}`);
        } else {
          return Observable.of(null);
        }
      })
      .subscribe(user => {
        this.user.next(user);
      });
  }

  login(email: string, password: string) : Observable<any> {
    return Observable.fromPromise(<any>this.Auth.auth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<void> {
    return Observable.fromPromise(<any>this.Auth.auth.signOut());
  }

  authStatus() : Observable<any> {
    return this.Auth.authState.first();
  }

}
