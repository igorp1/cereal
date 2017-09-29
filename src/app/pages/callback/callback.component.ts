import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ContextService } from '../../services/Context.service';

@Component({
  selector: 'callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router : Router,
    private _context : ContextService 
  ) { }

  ngOnInit() {
    this.decideRedirect();
  }

  decideRedirect() {
    this.router.navigateByUrl(this._context.lastPageVisited ? this._context.lastPageVisited.toString() : "");
  }

}
