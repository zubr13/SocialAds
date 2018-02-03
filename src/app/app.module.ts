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

export const MaterialModules = [
  MatButtonModule,
  MatCardModule

];

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
