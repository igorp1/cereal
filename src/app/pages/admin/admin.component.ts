import { Component, OnInit } from '@angular/core';

import { ContextService } from '../../services/Context.service'

import { AdminAPIService } from '../../services/AdminAPI.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _context : ContextService,
          private _admin : AdminAPIService) { }

  private inventory : any;
  private nav : any;
  private modal_top : number;
  private orderList : Array<any>;
  private orderList_metadata : any = {
    columns : [
      { name : 'ordered_date_time', dataType : 'dateTime', title : 'Time' },
      //{ name : 'price', dataType : 'money', title : '$$$'  },
      { name : 'status', dataType : 'text', title : 'Status'  },
      { name : ['user','email'] , dataType : 'text', title : 'User'  },
    ]
  }

  private restocking : any = undefined;
  private restockAmount : number;
  private restockError : string;

  ngOnInit() {
    this._context.visiting('admin');
    this.loadInventory();
    this.setupNav();
    this.loadOrders()
  }

  setupNav(){
    this.nav = {
      'pages': ['inventory', 'orders', 'dev'],
      'currentPage' : null
    }
    // set starting page
    this.nav.currentPage = this.nav.pages[0]
  }

  loadInventory(){
    this._admin.getInventory().subscribe( data => { this.inventory = data} )
  }

  loadOrders(){
    this._admin.getOrders().subscribe( data => { this.orderList = data} )
  }

  openLink(url : string){
    window.open(url,'_blank');
  }

  openRestockModal(restockingItem : any){
    this.modal_top = document.getElementsByClassName("mat-sidenav-content")[0].scrollTop
    let e = document.getElementsByClassName("mat-sidenav-content")[0]  as HTMLElement

    e.style.overflow = 'hidden'
    
    this.restocking = restockingItem
  }

  closeRestockModal(){
    let e : HTMLElement = document.getElementsByClassName("mat-sidenav-content")[0] as HTMLElement
    e.style.overflow = 'scroll'
    this.restockError = ""
    this.restocking = undefined
  }

  confirmRestockItem(){

    if(this.restockAmount != Math.floor(Number(this.restockAmount)) || this.restockAmount <=0 ){
      this.restockError = "Make sure you choose a positive whole number."
    }

    this.restocking.fields.units_stocked += this.restockAmount     
    
    this._admin.addToInventory(this.restocking.model, this.restocking.pk, this.restockAmount)
      .subscribe(data => {
        this.restockError = ""
        this.restocking = undefined
      })

  }
  
  calcPrice(cart : any): number{
    
    let sum = 0
    let deliveryprice = 3

    cart.forEach(cartItem => {
      sum += cartItem.count * cartItem.fields.price
    });

    return sum + deliveryprice


  }

  





}







