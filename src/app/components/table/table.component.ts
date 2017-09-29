import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'a-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  data: Array<any>;

  @Input()
  metadata : any;

  @Output() rowClickedEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() { } 

  rowClicked(rowItem : any) {
    this.rowClickedEmitter.emit(rowItem);
  }

  index(row, key){

    if(key instanceof Array){
      let val = row
      key.forEach(k=> val = val[k] )
      return val
    }
    else{
      return row[key]
    }

  }

}
