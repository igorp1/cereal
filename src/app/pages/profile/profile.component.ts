import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';

import { Router } from '@angular/router';
import { ContextService } from './../../services/Context.service';
import { UserAPIService } from './../../services/UserAPI.service';

import { APP_CONFIG } from './../../constants/AppConfig';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public address_picker_visible_toggle: boolean;
  public user_address_list : Array<any> = [];

  private pick_address_name : boolean = false;
  private new_address_info : any = {};
  private new_address_name : string;
  private userPhoneNumber : string;
  private editingPhoneNumber : boolean;
  private orderList : Array<any>;

  private APP_CONFIG = APP_CONFIG;

  constructor(public auth: AuthService,
    public _context : ContextService,
    private router : Router,
    private userAPI : UserAPIService) { }

  ngOnInit() {
    this.loadUserAddressList();
    this.loadPhonenumber();
    this.loadOrders();
  }

  loadOrders(){
    this.userAPI.getOrders().subscribe(d=>{
      this.orderList = d
    })
  }

  loadPhonenumber(){
    this.userAPI.getPhoneNumber().subscribe( d => {
      this.userPhoneNumber = d
    });
  }

  updatePhoneNumber(){
    this.editingPhoneNumber = false;
    this.userAPI.updatePhoneNumber(this.userPhoneNumber).subscribe()
  }

  loadUserAddressList(){
    this.userAPI.getAddressList().subscribe(data => {
      this.user_address_list = data;
    }); 
  }

  deleteAddress(address, ii){
    this.user_address_list.splice(ii, 1);
    this.userAPI.deleteAddressRecord(address.pk)
      .subscribe(data => { console.log(data) } );
  }

  getAddressFromComponent($event){
    // hide address picker
    this.address_picker_visible_toggle = false;

    // show name picker
    this.pick_address_name = true;

    // save the address emitted
    this.new_address_info = $event;
  }

  saveNewAddress(){

    // hide the edit info
    this.pick_address_name = false;
  
    // push into the list
    this.user_address_list.push({
      'fields':{
        'name':this.new_address_name,
        'address':this.new_address_info.address
      }
    });

    // save on db
    this.userAPI.saveNewAddress({
      'name':     this.new_address_name,
      'address':  this.new_address_info.address,
      'lat':      this.new_address_info.lat,
      'lon':      this.new_address_info.lon
    })
    .subscribe(data => { console.log(data) } );
    
    // cleanup
    this.new_address_info = {};

  }

  calculatePrice(obj){
    let cart = obj.cart;
    let sum = 0;
    let deliveryfee = 3;

    cart.forEach(element => {
      sum += element.count * element.fields.price
    });

    return sum + deliveryfee;

  }


  openOrder(id){

    this.router.navigate(['/order', id])

  }


}
