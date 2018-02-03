import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import {DatabaseService} from "./shared/services/database.service";
import {StorageService} from "./shared/services/storage.service";
import {FacebookAppService} from "./shared/services/facebook.service";
import {AuthService} from "./shared/services/auth.service";
import {FacebookAuth} from "./shared/services/authMethods/facebook";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButton, MatButtonModule} from '@angular/material';

export const MaterialModules = [
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...MaterialModules,
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
