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

  // the real mvp:
  // http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    this.setupMap()
  } 

  @Input() 
  visible : boolean = true;

  @Input()
  metadata : any = {};

  @Output() 
  addressChosenEmitter = new EventEmitter();

  validationMessage : string;

  selectedAddress : any;

  /*** map variables ***/
  public searchControl: FormControl;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public userInteracted: boolean;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;

  private setupMap(){

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

          this.selectedAddress = {
            'components' : place.address_components,
            'formatted' : place.formatted_address
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

  private isValidAddress(ADDRESS){
    let valid = false;

    // if you have the metadata to check
    if(this.metadata.validationZips)
    {
      ADDRESS.components.forEach( c =>{
        c.types.forEach(type => 
        {
          if(type == "postal_code")
          {
            this.metadata.validationZips.forEach(zip => {
              if(zip == c.long_name){ valid = true; }  
            });  
          }  
        });
      });
    }
    else
    {
      valid = true;
    }

    return valid;
  }

  private confirmAddress(){

    let debugging = false;
    if(debugging){
      console.log(this.searchElementRef.nativeElement.value)
      console.log(this.longitude)
      console.log(this.latitude)
    }

    let ADDR = {
      'address': this.selectedAddress.formatted,
      'lat': this.longitude,
      'lon': this.latitude
    }

    if(this.isValidAddress(this.selectedAddress)){
      this.validationMessage = undefined;
      this.addressChosenEmitter.emit(ADDR);
    }
    else{
      this.validationMessage = "Sorry, this address is not in our delivery zone."
    }

  }

  private close(){
    //this.visible = false;
    this.addressChosenEmitter.emit(null);
  }

}
