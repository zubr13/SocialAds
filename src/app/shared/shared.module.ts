import {AngularFireDatabase} from "angularfire2/database";
import {DatabaseService} from "./services/database.service";
import {FacebookAppService} from "./services/facebook.service";
import {FacebookAuth} from "./services/authMethods/facebook";
import {AuthService} from "./services/auth.service";
import {StorageService} from "./services/storage.service";
import {FormsModule} from "@angular/forms";
import {AngularFireAuthModule} from "angularfire2/auth";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [
    StorageService,
    AuthService,
    FacebookAuth,
    FacebookAppService,
    DatabaseService,
    AngularFireDatabase
  ]
})
export class SharedModule { }
