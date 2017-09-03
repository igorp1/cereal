import { Component, OnInit, Input, Output, EventEmitter, NgZone, ElementRef, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { FormControl } from '@angular/forms';
import {  APP_CONFIG  } from '../../constants/AppConfig';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';

@Component({
  selector: 'address-picker',
  templateUrl: './addressPicker.component.html',
  styleUrls: ['./addressPicker.component.css']
})
export class AddressPickerComponent implements OnInit {

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    this.setupMap()
  } 

  @Input() 
  visible : boolean = true;

  @Output() 
  addressChosenEmitter = new EventEmitter();

  /*** map variables ***/
  public searchControl: FormControl;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public userInteracted: boolean;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;


  setupMap(){

    this.zoom = 10;
    this.latitude = 42.343302;
    this.longitude = -71.107585;

    //create search FormControl
    this.searchControl = new FormControl();
    
    //set to current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, { types: ["address"] });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
          this.userInteracted = true;

        });
      });

    });

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  confirmAddress(){

    let debugging = false;
    if(debugging){
      console.log(this.searchElementRef.nativeElement.value)
      console.log(this.longitude)
      console.log(this.latitude)
    }

    let ADDR = {
      'address': this.searchElementRef.nativeElement.value,
      'lat': this.longitude ,
      'lon': this.latitude
    }

    this.addressChosenEmitter.emit(ADDR);

  }

  close(){
    //this.visible = false;
    this.addressChosenEmitter.emit(null);
  }


}
