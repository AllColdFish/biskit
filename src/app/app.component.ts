import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'biskit';

  cards: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.cards = db.collection('active_cards').valueChanges();
  }

}
