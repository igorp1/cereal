import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/Cart.service';

import { APP_CONFIG } from '../../constants/AppConfig';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  constructor(public auth: AuthService,
              private _cart: CartService) { }

  public profile :any;
  
  public prompt : string = "Please review your order below"; 
  public noItemText : string = "No items yet... click above to add something."
  public todayColor : string = APP_CONFIG.WeekdayColor; 

  ngOnInit() {
    this.auth.initializeProfile(this.profile);
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

}
