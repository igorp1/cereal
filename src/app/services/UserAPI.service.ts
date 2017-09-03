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

    getAddressList() {
        return this.http.get(
            this.API_BASE + "user/address/list",
            { headers: this.headers }
        ).map((res:Response) => res.json());
    }

    deleteAddressRecord(primaryKey : number){
        return this.http.post(
            this.API_BASE + "user/address/delete/",
            { 'address_id' : primaryKey },
            { headers: this.headers }
        );
    }

    saveNewAddress(addr_obj: any){
        return this.http.post(
            this.API_BASE + "user/address/add/",
            addr_obj,
            { headers: this.headers }
        );
    }

}