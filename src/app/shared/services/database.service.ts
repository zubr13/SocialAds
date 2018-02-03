import { Injectable } from '@angular/core';
import { database } from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
@Injectable()
export class DatabaseService {

  private database = database();
  public topic;

  private subscriptionPathsRefs: Object = {};

  getObject(path: string): Observable<any> {
    return Observable.fromPromise(this.database.ref(path).once('value'))
      .map( data => data.val());
  }
  getList(path: string, queryObject?: {
    orderByChild?,
    orderByKey?,
    orderByValue?,
    limitToFirst?,
    limitToLast?,
    startAt?,
    endAt?,
    equalTo?,
    orderByPriority?
  }): Observable<any> {
    const firebaseQueryMethods = [
      'orderByKey',
      'orderByValue',
      'orderByPriority',
    ];
    let queriedRef = this.database.ref(path);
    if (queryObject) {
      queriedRef = Object.keys(queryObject).reduce((ref, key: string) =>
          firebaseQueryMethods.indexOf(key) === -1  ?
            ref[key](queryObject[key]) :
            ref[key](),
        this.database.ref(path)
      );
    }
    return Observable.fromPromise(queriedRef.once('value'))
      .map(data => {
        const val = data.val();
        if (val) {
          const items = [];
          data.forEach(child => {
            const item = child.val();
            item['key'] = child.key;
            items.push(item);
            return false;
          });
          return items;
        }
        return [];
      });
  }

  setData(path: string, data: Object): Observable<any> {
    return Observable.fromPromise(this.database.ref(path).set(data));
  }

  pushData(path: string, data: Object): Observable<any> {
    return Observable.fromPromise(this.database.ref(path).push(data));
  }

  removeData(path: string): Observable<any> {
    return Observable.fromPromise(this.database.ref(path).remove());
  }

  updateData(path: string, data: Object): Observable<any> {
    return Observable.fromPromise(this.database.ref(path).update(data));
  }

  listenPath(path: string, eventType?: string): Observable<any> {
    return Observable.create( (observer) => {
      const ref = this.database.ref(path);
      this.subscriptionPathsRefs[path] = ref;
      ref.on(eventType ? eventType : 'value', snapshot => {
        const data = snapshot.val();
        if (data) {
          observer.next(snapshot.val());
        }
      });
    });
  }

  unsubscribeFromPath(path: string) {
    const ref = this.subscriptionPathsRefs[path];
    if (ref) {
      ref.off();
      delete this.subscriptionPathsRefs[path];
    }
    return Observable.of(null);
  }

  pushKey(path: string) {
    return this.database.ref(path).push().key;
  }

  getServerTimestamp() {
    return database.ServerValue.TIMESTAMP;
  }

  makeTransaction(path: string, callback: (currentValue: any) => any) {
    return Observable.fromPromise(this.database.ref(path).transaction(callback));
  }

}
