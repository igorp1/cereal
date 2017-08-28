import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CerealAPIService } from '../../services/CerealAPI.service';
import {Router} from '@angular/router';
import { CartService } from '../../services/Cart.service';

@Component({
  selector: 'cereal',
  templateUrl: './cereal.component.html',
  styleUrls: ['./cereal.component.css']
})
export class CerealComponent implements OnInit {

  constructor(public auth: AuthService, 
              private _cerealAPI : CerealAPIService,
              private _cart : CartService,
              private router : Router) { }

  public profile :any;
  public cerealList : Array<any>;

  ngOnInit() {
    this.auth.initializeProfile(this.profile);
    this.loadCereal();
  }

  loadCereal(){
    this._cerealAPI.getCereal().subscribe(data => {
      this.cerealList = this._cart.updateLoadedItems(data, 'cereal'); 
    });
  }

  addToCart($event, cereal){
    //console.log(cereal.fields.name + `(${cereal.count} => ${$event})`)
    cereal.count = $event;
    this._cart.addToCart(cereal);
  }

  goToMilk(){
    // store picked cereal

    // go to milk page
    this.router.navigateByUrl('/order/milk');

  }

}
