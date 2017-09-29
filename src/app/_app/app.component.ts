import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // project seed:
  // https://github.com/auth0-samples/auth0-angular-samples/blob/master/04-Authorization/src/app/app.component.html

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() { }

}
