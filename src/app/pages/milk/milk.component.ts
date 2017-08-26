import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CerealAPIService } from '../../services/api/CerealAPI.service';
import {Router} from '@angular/router';

@Component({
  selector: 'got-milk',
  templateUrl: './milk.component.html',
  styleUrls: ['./milk.component.css']
})
export class MilkComponent implements OnInit {

  constructor(public auth: AuthService, 
    private _cerealAPI: CerealAPIService,
    private router : Router) { }

  public profile :any;
  public milkList : Array<any>;

  ngOnInit() {
    this.auth.initializeProfile(this.profile);
    this.loadMilk();
  }

  loadMilk(){
    this._cerealAPI.getMilk().subscribe(data => this.milkList = data);  
  }


  addToCart($event, milk){
    console.log(milk.fields.name + `(${milk.count} => ${$event})`)
    milk.count = $event;
  }


  goToToppings(){
    // store picked cereal

    // go to milk page
    this.router.navigateByUrl('/order/toppings');

  }


}
