import { Injectable } from '@angular/core';
import { CheckInService } from './check-in.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, first } from 'rxjs/operators';
import { User } from '../data-models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  page = 0;
  user$: Observable<User>;
  registerActive = true;
  signUpUser: {};
  regType: number;
  name: string;
  email: string;
  password: string;

  constructor(
    public cs: CheckInService,
    private auth: AngularFireAuth,
    private afs: AngularFirestore
    ) {
      if (localStorage.getItem('user') === 'undefined') {
        localStorage.removeItem('user');
      }
      this.user$ = this.auth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }),
        // Add these lines to set/read the user data to local storage
        tap(user => {localStorage.setItem('user', JSON.stringify(user)); }),
        startWith(JSON.parse(localStorage.getItem('user')))
      );
    }

  togglePage(input: number) {
    this.page = input;
    this.cs.qrResultString = 'none';
  }

  async emailSignup(input: any) {
    const credential = await this.auth.auth.createUserWithEmailAndPassword(input.email, input.password);
    const data = {
      uid: credential.user.uid,
      email: credential.user.email
    };
    return this.updateUserData(data);
  }

  async emailSignIn(input: any) {
    const credential = await this.auth.auth.signInWithEmailAndPassword(input.email, input.password);
    return credential;
  }

  async signOut() {
    const signOut = await this.auth.auth.signOut();
    return signOut;
  }

  private updateUserData(data: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${data.uid}`);
    return userRef.set(data, { merge: true });
  }


}
