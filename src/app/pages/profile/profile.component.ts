import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';

import { ContextService } from './../../services/Context.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  address_picker_visible_toggle: boolean;

  constructor(public auth: AuthService,
  public _context : ContextService) { }

  ngOnInit() { }

  getAddressFromComponent($event){
    this.address_picker_visible_toggle = false;
  }


}
