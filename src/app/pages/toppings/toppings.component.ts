import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CerealAPIService } from '../../services/CerealAPI.service';
import {Router} from '@angular/router';
import { CartService } from '../../services/Cart.service';
import { ContextService } from '../../services/Context.service';

@Component({
  selector: 'toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.css']
})
export class ToppingsComponent implements OnInit {

  constructor(public auth: AuthService, 
    private _cerealAPI: CerealAPIService,
    private _cart : CartService,
    private _context : ContextService,
    private router : Router) { }

  public toppingList : Array<any>;

  ngOnInit() {
    this._context.visiting('order/toppings')
    this.loadToppings();
  }

  loadToppings(){
    this._cerealAPI.getTopping().subscribe(data => {
      this.toppingList = this._cart.updateLoadedItems(data, 'topping');
    });  
  }

  addToCart($event, topping){
    topping.count = $event; 
    this._cart.addToCart(topping);
  }

  goToReviewOrder(){
    // go to milk page
    this.router.navigateByUrl('/order/review');
  }

}
