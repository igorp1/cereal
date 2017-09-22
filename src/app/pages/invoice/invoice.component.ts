import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/Cart.service';
import { ContextService } from '../../services/Context.service';
import { UserAPIService } from '../../services/UserAPI.service';

import { ActivatedRoute } from '@angular/router';


import { APP_CONFIG } from '../../constants/AppConfig';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {

  constructor(public auth: AuthService,
              private _context : ContextService,
              private _cart : CartService,
              private userAPI : UserAPIService,
              private router : Router,
              private route : ActivatedRoute) { }
  

  orderId : number;
  orderModel : any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = Number(params['orderid']); 
      this._context.visiting(`order/${this.orderId}`)
      this.loadInvoiceInfo(this.orderId)
   });
  }

  loadInvoiceInfo(id : number){
    console.log('loading order info')
    this.userAPI.getOrderById(id).subscribe(
      d => {
        console.log(d);
        this.orderModel = d
      }
    )


  }

}
