import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { APP_CONFIG } from '../../constants/AppConfig';
import { ContextService } from '../../services/Context.service';
import { CartService } from '../../services/Cart.service';

import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public auth: AuthService,
    private _cart : CartService,
    private _context : ContextService,
    private mapsAPILoader: MapsAPILoader,
    private router : Router,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.loadUserAddressList();
    //this.setupMap();
  }

  public addressList: Array<any>;

  private loadUserAddressList(){
    this.addressList = [
      { 
        "name":"Home", 
        "location":"3615 Washington St. Boston, MA - 02130"  
      },
      { 
        "name":"Work", 
        "location":"2 Oliver St. Boston, MA - 02124"  
      },
      { 
        "name":"School", 
        "location":"8 Saint Mary St. Boston, MA - 02215"  
      },
    ]
  }

  private toggleAddress(addr){

    if(!addr.selected){
      this.addressList.forEach(ii =>{
        ii.selected = false;
      });
    }

    addr.selected = !addr.selected;

  }

  private addAddress(){
    this.router.navigateByUrl('profile')
  }

}

