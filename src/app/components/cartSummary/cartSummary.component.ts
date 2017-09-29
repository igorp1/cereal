import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/Cart.service'

@Component({
  selector: 'cart-summary',
  templateUrl: './cartSummary.component.html',
  styleUrls: ['./cartSummary.component.css']
})
export class CartSummaryComponent implements OnInit {

  @Input()
  cart: Array<any>;

  @Input()
  deliveryCost : Number;

  constructor(private cartService : CartService) { }

  ngOnInit() {  } 
  
  getTotalValue(){
    return this.cartService.calculateTotal(false, this.cart)
  }

}
