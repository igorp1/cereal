import { Routes, CanActivate } from '@angular/router';

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


import { AuthGuardService as AuthGuard } from '../services/auth/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from '../services/auth/scope-guard.service';

export const ROUTES: Routes = [
  { path: '',               component: HomeComponent },
  { path: 'about',          component: AboutComponent },
  { path: 'order/cereal',   component: CerealComponent },
  { path: 'callback',       component: CallbackComponent },
  { path: 'order/milk',     component: MilkComponent },
  { path: 'order/toppings', component: ToppingsComponent },
  { path: 'order/review',   component: OrderComponent },
  { path: 'order/payment',  component: PaymentComponent, canActivate: [AuthGuard] },  
  { path: 'profile',        component: ProfileComponent, canActivate: [AuthGuard] },  
  { path: 'admin',          component: AdminComponent, canActivate: [ScopeGuard], data: { expectedScopes: ['admin']} }, 
  { path: '**', redirectTo: '' }
];
 