import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ContextService } from '../../services/Context.service'
import {  APP_CONFIG  } from '../../constants/AppConfig'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public Title = APP_CONFIG.Title;
  public User : any;

  public loadingUser = true;

  constructor(public auth: AuthService,
              private _context :  ContextService) { }

  ngOnInit() {
    this.fetchUserInfo();
  }
  
  fetchUserInfo() : void{
    var self = this;
    setTimeout(()=>{
      if (self.auth.userProfile) {
      self.User = self.auth.userProfile;
      this.loadingUser = false;
    } else {
      if(localStorage.getItem('access_token')){
        self.auth.getProfile((err, profile) => {
          self.User = profile;
          this.loadingUser = false;
        });
      }else{
        // not logged in.
        this.loadingUser = false;
      }
    }
    }, 1000);
  }

  colorFromWeekday() : string {
    return APP_CONFIG.WeekdayColor;
  }


}
