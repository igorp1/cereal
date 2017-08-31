// @angular lib imports
import { NgModule }                           from '@angular/core';
import { FormsModule }                        from '@angular/forms';
import { HttpModule, Http, RequestOptions }   from '@angular/http';
import { RouterModule }                       from '@angular/router';
import { BrowserModule }                      from '@angular/platform-browser';
import { BrowserAnimationsModule }            from '@angular/platform-browser/animations';
import {  MaterialModule,
          MdButtonModule,
          MdSidenavModule,
          MdListModule,
          MdCardModule,
          MdMenuModule,
          MdInputModule,
          MdGridListModule
} from '@angular/material';

// Import gesture libs
import 'hammerjs';

// load app and routes
import { ROUTES } from './app.routes';
import { AppComponent }   from './app.component';

// import authentication libs (https://manage.auth.com)
import { AuthService }            from '../services/auth/auth.service';
import { AuthHttp, AuthConfig }   from 'angular2-jwt';

// import all page components
import { HomeComponent } from '../pages/home/home.component'; 
import { AdminComponent } from '../pages/admin/admin.component';
import { ProfileComponent } from '../pages/profile/profile.component'; 
import { AboutComponent } from '../pages/about/about.component'; 
import { CerealComponent } from '../pages/cereal/cereal.component'; 
import { MilkComponent } from '../pages/milk/milk.component'; 
import { ToppingsComponent } from '../pages/toppings/toppings.component'; 
import { ReviewComponent } from '../pages/review/review.component'; 
import { OrderComponent } from '../pages/order/order.component'; 
import { PaymentComponent } from '../pages/payment/payment.component'; 
import { CallbackComponent } from '../pages/callback/callback.component'; 

// import services
import { AuthGuardService }       from '../services/auth/auth-guard.service';
import { ScopeGuardService }      from '../services/auth/scope-guard.service';
import { CerealAPIService }       from '../services/CerealAPI.service';      
import { CartService }            from '../services/Cart.service';     
import { ContextService }            from '../services/Context.service';

// UIkit components
import { HeaderComponent }        from '../components/header/header.component';
import { NavContainerComponent }  from '../components/navContainer/navContainer.component';
import { StoreListItemComponent } from '../components/storeListItem/storeListItem.component'

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
        globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    ProfileComponent,
    AboutComponent ,
    CerealComponent,
    MilkComponent,
    ToppingsComponent,
    ReviewComponent,
    OrderComponent,
    PaymentComponent,
    CallbackComponent,
    HeaderComponent,
    NavContainerComponent,
    StoreListItemComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdButtonModule, MdSidenavModule, MdListModule,MdCardModule,MdMenuModule,MdInputModule,MdGridListModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ScopeGuardService,
    CerealAPIService,
    CartService,
    ContextService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
