import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  APP_CONFIG  } from '../../constants/AppConfig'

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  
  @Input()
  isLoading: Array<boolean>;

  @Input()
  color: string;

  @Input()
  message: string;

  @Input()
  fullscreen : boolean;

  constructor() { }

  ngOnInit() { } 

  canDisplay(){
    let visible = true;
    this.isLoading.forEach( ii => {visible = !ii ? false : visible} )
    return visible;
  }

}
