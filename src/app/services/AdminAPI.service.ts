import { Injectable } from '@angular/core';   
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { APP_CONFIG } from '../constants/AppConfig'

@Injectable()
export class AdminAPIService {

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

    getInventory() {
        this.buildAuthorizationHeader()
        return this.http.get(
            this.API_BASE + "admin/inventory/get/",
            { headers: this.headers })
            .map((res:Response) => res.json());
    }
    
    addToInventory(model : string, pID : number, amount : number){
        this.buildAuthorizationHeader()
        return this.http.get(
            this.API_BASE + `admin/inventory/add/${model}/${pID}/${amount}`,
            { headers: this.headers }
        )
    }

    getOrders(){
        this.buildAuthorizationHeader()
        return this.http.get(
            this.API_BASE + 'admin/order/get',
            { headers: this.headers }
        ).map((res:Response) => res.json());
    }

}