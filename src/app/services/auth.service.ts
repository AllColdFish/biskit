import { Injectable } from '@angular/core';
import { CheckInService } from './check-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  page = 0;

  constructor(public cs: CheckInService) { }

  togglePage(input: number) {
    this.page = input;
    this.cs.qrResultString = 'none';
  }

}
