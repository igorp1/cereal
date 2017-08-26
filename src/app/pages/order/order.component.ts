import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

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
