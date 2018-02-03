import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {DatabaseService} from "./shared/services/database.service";
import {StorageService} from "./shared/services/storage.service";
import {FacebookAppService} from "./shared/services/facebook.service";
import {AuthService} from "./shared/services/auth.service";
import {FacebookAuth} from "./shared/services/authMethods/facebook";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButton, MatButtonModule, MatCardModule} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import * as firebase from 'firebase';
import {AngularFireModule} from "angularfire2";
import {SharedModule} from "./shared/shared.module";
export const MaterialModules = [
  MatButtonModule,
  MatCardModule

];

const config = {
  apiKey: "AIzaSyDFYMCG9U8eX2ertHJMNHkHBAynOr5yEnk",
  authDomain: "social-ads-1708a.firebaseapp.com",
  databaseURL: "https://social-ads-1708a.firebaseio.com",
  projectId: "social-ads-1708a",
  storageBucket: "social-ads-1708a.appspot.com",
  messagingSenderId: "571321929761"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...MaterialModules,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
