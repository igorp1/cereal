// @angular lib imports
import { NgModule }                           from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, Http, RequestOptions }   from '@angular/http';
import { ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
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

import { CommonModule }   from '@angular/common';
import {  XSRFStrategy, CookieXSRFStrategy } from '@angular/http';

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
import { OrderComponent } from '../pages/order/order.component'; 
import { PaymentComponent } from '../pages/payment/payment.component'; 
import { CallbackComponent } from '../pages/callback/callback.component'; 
import { InvoiceComponent } from '../pages/invoice/invoice.component'; 

// import services
import { AuthGuardService }       from '../services/auth/auth-guard.service';
import { ScopeGuardService }      from '../services/auth/scope-guard.service';
import { CerealAPIService }       from '../services/CerealAPI.service';      
import { CartService }            from '../services/Cart.service';     
import { ContextService }         from '../services/Context.service';
import { UserAPIService }         from '../services/UserAPI.service';
import { AdminAPIService }        from '../services/AdminAPI.service';
import { PaymentService }        from '../services/Payment.service';

// UIkit components
import { HeaderComponent }        from '../components/header/header.component';
import { NavContainerComponent }  from '../components/navContainer/navContainer.component';
import { StoreListItemComponent } from '../components/storeListItem/storeListItem.component';
import { AddressPickerComponent } from '../components/addressPicker/addressPicker.component';
import { LoadingComponent }       from '../components/loading/loading.component';
import { TableComponent }       from '../components/table/table.component';
import { CartSummaryComponent }       from '../components/cartSummary/cartSummary.component';

// third-party libs
import { AgmCoreModule } from '@agm/core';
import { MomentModule } from 'angular2-moment';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
        globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    // app
    AppComponent,
    // pages
    HomeComponent,
    AboutComponent,
    AdminComponent,
    ProfileComponent,
    CerealComponent,
    MilkComponent,
    ToppingsComponent,
    OrderComponent,
    PaymentComponent,
    CallbackComponent,
    // ui-kit components
    HeaderComponent,
    NavContainerComponent,
    StoreListItemComponent,
    AddressPickerComponent,
    LoadingComponent,
    InvoiceComponent,
    TableComponent,
    CartSummaryComponent
  ],
  providers: [
    // my services
    CerealAPIService,
    UserAPIService,
    AdminAPIService,
    CartService,
    ContextService,
    PaymentService,
    // auth services
    AuthService,
    AuthGuardService,
    ScopeGuardService,
    // 3rd party services
    {
      provide: [AuthHttp, XSRFStrategy],
      useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken'),
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAH3AKzb2Yk85CDiJQ3svmNEa1gS-JjVg4",
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdButtonModule,MdSidenavModule,MdListModule,MdCardModule,MdMenuModule,MdInputModule,MdGridListModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule.forRoot(ROUTES)
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
