import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { FirestoreUser } from 'src/app/models/firestore-user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<User>;

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  getCurrentUser(): User {
    const user = firebase.auth().currentUser;

    if (user != null) {
      return user;
    }

    return null;
  }

  // Firebase Logout
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // Firebase Email Sign-in
  async signInWithEmail(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password).then((credential) => {
      this.updateUserData(credential.user);
      this.router.navigate(['/app']);
    });
  }

  async isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (user) {
          console.log('is');
          resolve(true);
        } else {
          console.log('is not');
          resolve(false);
        }
      });
    }
    );
  }

  async isLoggedInAndIsAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        console.log('admin login triggered');
        console.log(user);
        if (!user) {
          resolve(false);
        } else {
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
          const item = userRef.valueChanges();
          item.subscribe((ind: FirestoreUser) => {
            if (ind.admin) {
              console.log('is  ' + console.log(ind));
              resolve(true);
            } else {
              console.log('is not');
              resolve(false);
            }
          });
        }
      });
    }
    );
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      email: user.email
    };


    return userRef.set(data, { merge: true });
  }
}
