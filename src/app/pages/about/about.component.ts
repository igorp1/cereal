import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ContextService } from '../../services/Context.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router,
              private _context: ContextService) { }

  public aboutText : Array<any>;

  ngOnInit() {
    this.loadAboutText();
    this._context.visiting('about')
  }

  loadAboutText(){
    this.aboutText = [
      {
        'title':'What do we do?',
        'text': 'We are a software company that delivers cereal. We are passionate about the feel of a saturday morning and want to bring that to you.'
      },
      {
        'title':'How does it work?',
        'text': 'You choose your favorite cereal, type of milk and toppings and we\'ll deliver it in 20 to 30 minutes.'
      },
      {
        'title':'How much is it?',
        'text': 'Anything you choose is only $1.50! Some of the toppings are chaper, though. Everything is well served.'
      },
      {
        'title':'Where do I start?',
        'text': 'If this is your first time sign up above and update your profile or get started by building a bowl.'
      }
    ]
  }

  buildABowl(){
    this.router.navigateByUrl('order/cereal')
  }

}
