import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CerealAPIService } from '../../services/CerealAPI.service';
import {Router} from '@angular/router';
import { CartService } from '../../services/Cart.service';

@Component({
  selector: 'toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.css']
})
export class ToppingsComponent implements OnInit {

  constructor(public auth: AuthService, 
    private _cerealAPI: CerealAPIService,
    private _cart : CartService,
    private router : Router) { }

  public profile :any;
  public toppingList : Array<any>;

  ngOnInit() {
    this.auth.initializeProfile(this.profile);
    this.loadToppings();
  }

  loadToppings(){
    this._cerealAPI.getTopping().subscribe(data => {
      this.toppingList = this._cart.updateLoadedItems(data, 'topping');
    });  
  }

  addToCart($event, topping){
    //console.log(topping.fields.name + `(${topping.count} => ${$event})`)
    topping.count = $event; 
    this._cart.addToCart(topping);
  }

  goToReviewOrder(){
    // store picked toppings

    // request order ID

    // go to milk page
    this.router.navigateByUrl('/order/review');

  }

}
