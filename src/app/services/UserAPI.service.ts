/// remember that when requests go out for this service they must have the header:
// Authorization: JWT <token>

import { Injectable } from '@angular/core';   
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { APP_CONFIG } from '../constants/AppConfig'

@Injectable()
export class UserAPIService {

    constructor ( private http: Http ) {
        this.API_BASE = APP_CONFIG.isDev ? APP_CONFIG.ApiUris.dev : APP_CONFIG.ApiUris.prod;
        this.buildAuthorizationHeader();
    }

    private is_dev : boolean = true;
    private API_BASE : String;
    private headers : Headers;

    buildAuthorizationHeader() : void{
        let headers = new Headers();
        headers.append('Authorization', 
        'JWT ' + localStorage.getItem('access_token')); 
        this.headers = headers;
    }

    //======= ADDRESS SERVICES
    getAddressList() {
        this.buildAuthorizationHeader()
        return this.http.get(
            this.API_BASE + "user/address/get",
            { headers: this.headers }
        ).map((res:Response) => res.json());
    }

    deleteAddressRecord(primaryKey : number){
        this.buildAuthorizationHeader()
        return this.http.post(
            this.API_BASE + "user/address/delete/",
            { 'address_id' : primaryKey },
            { headers: this.headers }
        );
    }

    saveNewAddress(addr_obj: any){
        this.buildAuthorizationHeader()
        return this.http.post(
            this.API_BASE + "user/address/add/",
            addr_obj,
            { headers: this.headers }
        );
    }

    //======= ORDER SERVICES
    getOrderById(id : number){
        this.buildAuthorizationHeader()
        return this.http.get(
            this.API_BASE + `order/${id}/get`,
            { headers: this.headers }
        ).map((res:Response) => res.json());
    } 

    getOrders(){
        this.buildAuthorizationHeader()
        return this.http.get(
            this.API_BASE + `user/order/get`,
            { headers: this.headers }
        ).map((res:Response) => res.json());
    }

    //======= PHONE SERVICES
    getPhoneNumber(){
        this.buildAuthorizationHeader()
        return this.http.get(
            this.API_BASE + `user/phone/get`,
            { headers: this.headers }
        ).map((res:Response) => res.json());
    }

    updatePhoneNumber(number : string){
        this.buildAuthorizationHeader()
        return this.http.post(
            this.API_BASE + "user/phone/update/",
            { 'p': number },
            { headers: this.headers }
        );
    }

    //======= SCOPE SERVICE
    getUserScopes() {
        this.buildAuthorizationHeader()
        return this.http.get(
            this.API_BASE + "user/scope/get",
            { headers: this.headers }
        ).map((res:Response) => res.json());
    }







}