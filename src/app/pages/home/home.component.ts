import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { ContextService } from '../../services/Context.service';

import { APP_CONFIG } from '../../constants/AppConfig'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService,
            private _context : ContextService) { }

  ngOnInit() {
    this._context.visiting('');
    this.setupPageConfig(); 
  }

  public gifs : Array<string> = APP_CONFIG.AppValues.homeGifs;
  public PageConfig : any;

  private setupPageConfig() : any{
    this.PageConfig = {
      'greeting': 'Yo!',
      'blurb': 'If you are craving some cereal this is definitely the right place. We have all this different types of milk, toppings and - of course - cereal! Get started below or login/signup above.',
      'logo' : '/assets/img/logo/cereal-logo-no-background.svg',
      'welcomeLinks' : this.getWelcomeLinks()
    }
  }

  private getWelcomeLinks() : Array<any>{
    return [
      {'label':'Learn more',      'link':'about',         'color':this._context.todaysColor},
      {'label':'Build your bowl', 'link':'order/cereal',  'color':this._context.todaysColor}
    ];
  }

}
