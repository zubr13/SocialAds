import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {DatabaseService} from "./shared/services/database.service";
import {StorageService} from "./shared/services/storage.service";
import {FacebookAppService} from "./shared/services/facebook.service";
import {AuthService} from "./shared/services/auth.service";
import {FacebookAuth} from "./shared/services/authMethods/facebook";
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import * as firebase from 'firebase';
import {AngularFireModule} from "angularfire2";
import {SharedModule} from "./shared/shared.module";
import { UploadComponent } from './upload/upload.component';
import {ImageUploadModule} from "angular2-image-upload";
import { CreateAdComponent } from './create/create.component';
import { TopicsComponent } from './topics/topics.component';
import { MyAdsComponent } from './my-ads/my-ads.component';

export const MaterialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
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
    UploadComponent,
    CreateAdComponent,
    TopicsComponent,
    MyAdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    BrowserAnimationsModule,
    ...MaterialModules,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    SharedModule,
    ImageUploadModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
