import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {ProfileComponent} from "./profile/profile.component";
import {CreateAdComponent} from './create/create.component';
import {AuthGuard} from "./shared/guards/auth.guard";
import {TopicsComponent} from './topics/topics.component';

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
        path: 'create-ad',
        component: CreateAdComponent
      },
      {
        path: 'topics',
        component: TopicsComponent,
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
