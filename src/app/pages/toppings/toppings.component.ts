import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CerealAPIService } from '../../services/api/CerealAPI.service';
import {Router} from '@angular/router';

@Component({
  selector: 'toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.css']
})
export class ToppingsComponent implements OnInit {

  constructor(public auth: AuthService, 
    private _cerealAPI: CerealAPIService,
    private router : Router) { }

  public profile :any;
  public toppingList : Array<any>;

  ngOnInit() {
    this.auth.initializeProfile(this.profile);
    this.loadMilk();
  }

  loadMilk(){
    this._cerealAPI.getTopping().subscribe(data => this.toppingList = data);  
  }


  addToCart($event, milk){
    console.log(milk.fields.name + `(${milk.count} => ${$event})`)
    milk.count = $event;
  }


  goToReviewOrder(){
    // store picked toppings

    // request order ID

    // go to milk page
    this.router.navigateByUrl('/order/review');

  }

}
