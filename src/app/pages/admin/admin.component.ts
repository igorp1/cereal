import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../constants/Inventory'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  public inventory : any;

  ngOnInit() {
    this.loadInventory()
  }

  loadInventory(){
    this.inventory = Inventory;
  }
  
}



// HERE's some stuff I'll leave here for future reference:

//import { AuthHttp } from 'angular2-jwt';

// API_URL = 'http://localhost:3001/api';
// message: string;

// public adminPing(): void {
//   this.message = '';
//   this.authHttp.post(`${this.API_URL}/admin`, {})
//     .map(res => res.json())
//     .subscribe(
//       data => this.message = data.message,
//       error => this.message = error
//     );
// }





