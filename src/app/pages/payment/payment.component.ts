import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { APP_CONFIG } from '../../constants/AppConfig'

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public auth: AuthService) { }

  public profile :any;
  ngOnInit() {

    this.auth.initializeProfile(this.profile);

  }

}
