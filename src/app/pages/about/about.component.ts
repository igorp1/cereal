import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public auth: AuthService) { }

  public profile :any;

  public aboutText : Array<any>;

  ngOnInit() {
    this.auth.initializeProfile(this.profile);
    this.loadAboutText();
  }

  loadAboutText(){
    this.aboutText = [
      {
        'title':'What do we do?',
        'text': 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah '
      },
      {
        'title':'How does it work?',
        'text': 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah '
      },
      {
        'title':'How much is it?',
        'text': 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah '
      },
      {
        'title':'Where do I start?',
        'text': 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah '
      }
    ]
  }

}
