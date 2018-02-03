import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {DatabaseService} from "./shared/services/database.service";
import {StorageService} from "./shared/services/storage.service";
import {FacebookAppService} from "./shared/services/facebook.service";
import {AuthService} from "./shared/services/auth.service";
import {FacebookAuth} from "./shared/services/authMethods/facebook";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DatabaseService,
    StorageService,
    FacebookAppService,
    AuthService,
    FacebookAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
