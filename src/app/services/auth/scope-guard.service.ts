import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';

import { ContextService } from '../Context.service'
import { APP_CONFIG } from '../../constants/AppConfig'

@Injectable()
export class ScopeGuardService implements CanActivate {

  constructor(public auth : AuthService, 
              public router : Router,
              public _context : ContextService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {

    if (APP_CONFIG.bypassScopeGuard){ return true; }

    const scopes = route.data.expectedScopes;

    // make sure user is logged in
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }

    let scope_check_result : Array<boolean> = []
    scopes.forEach(s => {
      console.log(s)
      switch(s){
        case 'admin':
          if(this._context.isUserAdmin()) {
            scope_check_result.push(true)
          }
          break;
        case 'delivery':
          if(this._context.isUserDelivery()){
            scope_check_result.push(true)
          } 
          break;
        default:
          throw `${s} is not a known scope.`
      }

    });
    
    if (scope_check_result.length != scopes.length) {
      this.router.navigate(['']);
      return false;
    }

    return true;
    
  }

}

/*

canActivate(route: ActivatedRouteSnapshot): boolean {

    const scopes = route.data.expectedScopes;

    if (!this.auth.isAuthenticated() || !this.auth.userHasScopes(scopes)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

*/

