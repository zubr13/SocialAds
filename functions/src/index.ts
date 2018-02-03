import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export interface Roles {
  moderator: boolean;
}

export interface AppUser {
  balance: string | number;
  roles: Roles;
}

admin.initializeApp(functions.config().firebase);

const database = admin.database();

exports.createUser = functions.auth.user().onCreate(event => {
  const user = event.data;

  return database.ref(`/users/${user.uid}`).set({
    balance: '0',
    roles: {
      moderator: false,
    }
  } as AppUser);
});
