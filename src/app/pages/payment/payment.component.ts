import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { APP_CONFIG } from '../../constants/AppConfig';
import { ContextService } from '../../services/Context.service';
import { CartService } from '../../services/Cart.service';
import { UserAPIService } from '../../services/UserAPI.service';
import { PaymentService } from '../../services/Payment.service';


@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public auth: AuthService,
    private _cart : CartService,
    private userAPI : UserAPIService,
    private _context : ContextService,
    private router : Router,
    private _pay : PaymentService){ }

  handler : any;

  loadingPaymentProcessing : boolean = false;
  addressMissingWarning : boolean = false;

  ngOnInit() {

    if(this._cart.cartID){
      this.loadUserAddressList();
      this._cart.setOrderStatus("PAYING")
      this.setupStripeCheckout()
      this._context.visiting(`order/payment`)
    }
    else{
      this.router.navigateByUrl('/order/review')
    }

  }

  public addressList: Array<any>;

  private loadUserAddressList(){
    if(this.addressList) return;
    this.userAPI.getAddressList().subscribe(data => {
      this.addressList = data;
    }); 
  }

  private toggleAddress(addr){

    this.addressMissingWarning = false;

    if(!addr.selected){
      this.addressList.forEach(ii =>{
        ii.selected = false;
      });
    }

    addr.selected = !addr.selected;

    if(addr.selected){
      this._cart.setOrderAddress(addr.pk)
    }

  }

  private addAddress(){
    this.router.navigateByUrl('profile')
  }

  private setupStripeCheckout(){

    this.handler = (<any>window).StripeCheckout.configure({
      key : APP_CONFIG.stripeKey,
      image: 'http://localhost:4200/assets/img/logo/cereal-logo-no-background.svg',
      locale: 'auto',
      token : token => this.processPayment(token)
    });

  }

  private openPaymentModal(){
    let anySelected = false;
    this.addressList.forEach(ii =>{
      anySelected = anySelected || ii.selected;
    });
    if(!anySelected) { 
        this.addressMissingWarning = true;
        return; 
    }

    this.handler.open({
      name : 'cereal!',
      description : 'please enter your payment info below',
      amount : this._cart.calculateTotal(true), // in stripe amounts are 1/100 of the currency
      email : this._context.profile.email
    })
  }

  private processPayment(token : any){
    
    this.loadingPaymentProcessing = true;

    // rqst to process payment =>
    this._pay.processPayment(this._cart.cartID, token, this._cart.calculateTotal(true)).subscribe(
      (d) => {
        if (d.status != 200){
          alert('Ooops, we encountered an error. PLease try again.')
          console.error('something went wrong.')
        }

        // clear cart =>
        this._cart.clearCart()
        this.router.navigate(['/order', this._cart.cartID])
      }
    )

  }

  @HostListener('window:popstate')
  onPopstate(){
    this.handler.close()
  }





}

