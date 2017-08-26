import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.css']
})
export class ToppingsComponent implements OnInit {

  constructor(public auth: AuthService) { }

  public profile :any;

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      if(localStorage.getItem('access_token')){
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }
  }

}
