import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CheckInService } from '../../services/check-in.service';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = true;

  placeholderName = 'HungryHippo';

  merchant: Observable<any>;

  constructor(afs: AngularFirestore, public cs: CheckInService, public auth: AuthService) {
    if (cs.qrResultString && cs.qrResultString !== 'none') {
      this.merchant = afs.doc(`merchant_users/${cs.qrResultString}`).valueChanges().pipe(
        tap(doc => {
          if (!doc) {
            this.isLoading = true;
          } else {
            this.isLoading = false;
          }
        })
      );
    } else if (cs.qrResultString === 'none') {
      this.isLoading = false;
    }
  }

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    return this.auth.emailSignup(this.profileForm.value);
  }

  ngOnInit() {

  }

}
