import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AppUser, AuthService} from '../services/auth.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable()
export class ModeratorGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.user
      .take(1)
      .map((user: AppUser) => {
        if (!user) {
          console.log('You have not got moderator role');
          this.router.navigateByUrl('/');
          return false;
        } else if (!!user.roles && user.roles.moderator) {
          return true;
        }
        return false;
      });
  }
}
