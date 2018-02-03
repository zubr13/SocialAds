import { Component, OnInit } from '@angular/core';
import {StorageService} from "../shared/services/storage.service";
import {FacebookAppService} from "../shared/services/facebook.service";
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(
    private storage: StorageService,
    private facebook: FacebookAppService
  ) { }

  ngOnInit() {
    this.facebook.getPosts().subscribe(data => console.log(data));
  }

  onChangeFile(event) {
    const file = event.file;
    console.log(file);
    this.storage.uploadFile(file, `${this.guid()}${file.name}`, 'uploads')
      .flatMap(data => {
        console.log(data);
        return this.facebook.init().flatMap(response => this.facebook.postFile(data.downloadURL));
      })
      .subscribe(data => console.log(data));

  }

  guid() {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

}
