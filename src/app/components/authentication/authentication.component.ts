import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../services/check-in.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  page = false;

  constructor(public cs: CheckInService, public auth: AuthService) { }

  ngOnInit() {
  }

  selectPage(input: boolean) {
    this.page = input;
    console.log(this.page);
  }

}
