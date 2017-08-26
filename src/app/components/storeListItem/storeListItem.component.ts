import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  APP_CONFIG  } from '../../constants/AppConfig'

@Component({
  selector: 'store-li',
  templateUrl: './storeListItem.component.html',
  styleUrls: ['./storeListItem.component.css']
})
export class StoreListItemComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  image: string;

  @Input()
  color: string;

  @Input()
  count: number;

  @Input()
  unit : any;
  
  @Output() incrementCount = new EventEmitter();

  constructor() {
    this.incrementCount.emit(this.count);
  }

  ngOnInit() { } 

  addingToCart() {
    this.count = this.count ? this.count + 1 : 1;
    this.incrementCount.emit(this.count);
  }

}
