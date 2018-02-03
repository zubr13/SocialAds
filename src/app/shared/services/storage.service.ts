import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import {storage} from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class StorageService {

  private storage: storage.Storage = storage();

  constructor(private sanitizer: DomSanitizer) {

  }

  uploadFile(file: File, fileName: string, path: string): Subject<storage.UploadTaskSnapshot> {
    const subject = new Subject<storage.UploadTaskSnapshot>();

    const storageRef = this.storage.ref();

    const uploadTask: storage.UploadTask =
      storageRef.child(`/${path}/${fileName}`).put(file);

    uploadTask.then((snapshot: storage.UploadTaskSnapshot) => {
      subject.next(snapshot);
    });

    return subject;
  }

  getFileDownloadUrl(path: string): Observable<any> {
    return Observable.fromPromise(this.storage.ref().child(path).getDownloadURL()
      .then( data => this.sanitizer.bypassSecurityTrustUrl(data))
    );
  }

  removeFile(path: string): Observable<any> {
    return Observable.fromPromise(this.storage.ref(path).delete());
  }

  removeFromUrl(url: string): Observable<any> {
    return Observable.fromPromise(this.storage.refFromURL(url).delete());
  }
}
