import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {ProfileComponent} from "./profile/profile.component";
import {CreateAdComponent} from './create/create.component';
import {AuthGuard} from "./shared/guards/auth.guard";
import {UploadComponent} from "./upload/upload.component";
import {TopicsComponent} from './topics/topics.component';
import {ModeratorGuard} from './shared/guards/moderator.guard';
import {MyAdsComponent} from './my-ads/my-ads.component';
import {ModeratorPageComponent} from './moderator-page/moderator-page.component';
const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'app',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'profile',
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'create-ad',
        component: CreateAdComponent
      },
      {
        path: 'topics',
        component: TopicsComponent
      },
      {
        path: 'ads',
        component: MyAdsComponent,
      },
      {
        path: 'moderator-page',
        component: ModeratorPageComponent,
        canActivate: [ModeratorGuard],
      }
    ]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
