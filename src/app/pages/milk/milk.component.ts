import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CerealAPIService } from '../../services/CerealAPI.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/Cart.service';
import { ContextService } from '../../services/Context.service';

@Component({
  selector: 'got-milk',
  templateUrl: './milk.component.html',
  styleUrls: ['./milk.component.css']
})
export class MilkComponent implements OnInit {

  constructor(public auth: AuthService, 
    private _cerealAPI: CerealAPIService,
    private _cart: CartService,
    private _context : ContextService,
    private router : Router) { }

  public milkList : Array<any>;
  public loadingMilk : boolean = true;

  ngOnInit() {
    this._context.visiting('order/milk');
    this.loadMilk();
  }

  loadMilk(){
    this.loadingMilk = true;
    this._cerealAPI.getMilk().subscribe(data => {
      this.milkList = this._cart.updateLoadedItems(data, 'milk'); 
      this.loadingMilk = false;
    });  
  }


  addToCart($event, milk){
    //console.log(milk.fields.name + `(${milk.count} => ${$event})`)
    milk.count = $event;
    this._cart.addToCart(milk);
  }

  goToToppings(){
    // store picked cereal
    // go to milk page
    this.router.navigateByUrl('/order/toppings');
  }

}
