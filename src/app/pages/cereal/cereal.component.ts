import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CerealAPIService } from '../../services/api/CerealAPI.service';
import {Router} from '@angular/router';

@Component({
  selector: 'cereal',
  templateUrl: './cereal.component.html',
  styleUrls: ['./cereal.component.css']
})
export class CerealComponent implements OnInit {

  constructor(public auth: AuthService, 
              private _cerealAPI: CerealAPIService,
              private router : Router) { }

  public profile :any;
  public cerealList : Array<any>;

  ngOnInit() {
    
    this.auth.initializeProfile(this.profile);

    this.loadCereal();

  }

  loadCereal(){
    this._cerealAPI.getCereal().subscribe(data => this.cerealList = data);
  }

  addToCart($event, cereal){
    //console.log(cereal.fields.name + `(${cereal.count} => ${$event})`)
    cereal.count = $event;
  }

  goToMilk(){
    // store picked cereal

    // go to milk page
    this.router.navigateByUrl('/order/milk');

  }

}
