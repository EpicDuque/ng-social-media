import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  
  public displayName: string = '';

  loggedIn: boolean = false;
  redirectUrl: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          this.loggedIn = true;
          var userRef = this.getUserRef(user);
          var obs = userRef.valueChanges();

          obs.subscribe(data => {
            if(data && data.displayName !== ''){
              this.displayName = data.displayName;
            } else {
              this.displayName = user.displayName;
            }
            
            obs.subscribe();
          })

          this.router.navigate(['/posts'])

          return obs;

        } else {
          this.loggedIn = false;
          this.displayName = null;

          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    return credential;
  }

  getUserRef(user){
    const ref: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    return ref;
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  userEmailSignin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData(user){
    var {uid, displayName, photoURL} = user;

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data: User = {
      uid: uid,
      displayName: displayName,
      photoURL: photoURL? photoURL : '',
    }

    return userRef.set(data, { merge: true });
  }
}
