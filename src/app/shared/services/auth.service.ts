import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  public facebookToken;

  constructor(private Auth: AngularFireAuth) {
    this.facebookToken = localStorage.getItem('facebookToken');
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
