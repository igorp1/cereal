import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AuthService }        from '../../services/auth/auth.service';
import { CerealAPIService }   from '../../services/CerealAPI.service';
import { CartService }        from '../../services/Cart.service';
import { ContextService }     from '../../services/Context.service';

@Component({
  selector: 'cereal',
  templateUrl: './cereal.component.html',
  styleUrls: ['./cereal.component.css']
})
export class CerealComponent implements OnInit {

  constructor(public auth: AuthService, 
              private _cerealAPI : CerealAPIService,
              private _cart : CartService,
              private _context: ContextService,
              private router : Router) { }

  public cerealList : Array<any>;

  ngOnInit() {
    this._context.visiting('order/cereal');
    this.loadCereal();
  }

  loadCereal(){
    this._cerealAPI.getCereal().subscribe(data => {
      this.cerealList = this._cart.updateLoadedItems(data, 'cereal'); 
    });
  }

  addToCart($event, cereal){
    cereal.count = $event;
    this._cart.addToCart(cereal);
  }

  goToMilk(){
    // go to milk page
    this.router.navigateByUrl('/order/milk');
  }

}
