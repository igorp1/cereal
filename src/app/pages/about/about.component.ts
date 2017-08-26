import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

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
