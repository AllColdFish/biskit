import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/check-in.service';
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

  constructor(afs: AngularFirestore, public cs: CheckInService) {
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

  ngOnInit() {

  }

}
