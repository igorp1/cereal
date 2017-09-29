import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { ITab } from '../../interfaces/ITab'
import { APP_CONFIG } from '../../constants/AppConfig'
import { TabTypeEnum } from '../../constants/Enums'

@Component({
  selector: 'nav-container',
  templateUrl: './navContainer.component.html',
  styleUrls: ['./navContainer.component.css']
})
export class NavContainerComponent implements OnInit {

  public Tabs : any = APP_CONFIG.Tabs;

  constructor(public auth: AuthService) {  }

  ngOnInit() { }

  shouldShowTab(tab : ITab): boolean{
    var self = this;
    switch(tab.security.Type){
      case TabTypeEnum.open:
        return true;
      case TabTypeEnum.needsAuthentication:
        return self.auth.isAuthenticated();// am I logged in
      case TabTypeEnum.needsAuthorization: 
        return self.auth.isAuthenticated() && self.auth.userHasScopes(tab.security.Scopes);
    }
  }

}





