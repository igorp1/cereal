import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { APP_CONFIG } from '../../constants/AppConfig';
import { ContextService } from '../../services/Context.service';
import { CartService } from '../../services/Cart.service';
import { UserAPIService } from '../../services/UserAPI.service';


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
    private router : Router) { }

  ngOnInit() {
    this.loadUserAddressList();
    this._cart.setOrderStatus("PAYING")
  }

  public addressList: Array<any>;

  private loadUserAddressList(){
    this.userAPI.getAddressList().subscribe(data => {
      this.addressList = data;
    }); 
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

