import {ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {AppUser, AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  navItems = [
    { name: 'Profile', link: '/app/profile' },
    { name: 'Topics', link: '/app/topics' },
    { name: 'My Ads', link: '/app/ads' },
  ];

  isModerator = false;

  constructor (changeDetectorRef: ChangeDetectorRef,
               media: MediaMatcher,
               private router: Router,
               private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.authService.user
      .take(1)
      .subscribe((user: AppUser) => {
        if (!user) {
          this.isModerator = false;
        } else if (user && user.roles && user.roles.moderator) {
          this.isModerator = true;
        } else {
          this.isModerator = false;
        }
      });
  }


  logout(): void {
    this.authService.logout()
      .take(1)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
