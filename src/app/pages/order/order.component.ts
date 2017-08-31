import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/Cart.service';
import { ContextService } from '../../services/Context.service';

import { APP_CONFIG } from '../../constants/AppConfig';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  constructor(public auth: AuthService,
              private _cart: CartService,
              private _context: ContextService,
              private router : Router) { }

  public profile :any;
  
  public prompt : string = "Please review your order below"; 
  public noItemText : string = "No items yet... click above to add something."
  public todayColor : string = APP_CONFIG.WeekdayColor; 

  ngOnInit() {
    this.auth.initializeProfile(this.profile);
    this._context.visiting('order/review')
  }

  minusOneOnCart(item){

    if(item.count - 1 == 0){
      if(confirm(`This will delete ${item.fields.name} from your cart, do you want to continue?`)){
        // delete
        this._cart.removeFromCart(item);
      }
    }
    else{
      item.count--;
      this._cart.persist();
    }
  }

  plusOneOnCart(item){
    item.count++;
    this._cart.persist();
  }

  readyToPay(){
    // the order is only saved on the application and local storage
    if (this.auth.isAuthenticated()){
      this.router.navigateByUrl('order/payment');
    }
    else{
      this.auth.login();
    }
  }

}
