import { Injectable } from '@angular/core';   
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { APP_CONFIG } from '../constants/AppConfig'

@Injectable()
export class CerealAPIService {
    constructor ( private http: Http ) {
        this.API_BASE = APP_CONFIG.isDev ? APP_CONFIG.ApiUris.dev : APP_CONFIG.ApiUris.prod;
        this.buildAuthorizationHeader();
    }

    private is_dev : boolean = true;
    private API_BASE : String;
    private headers : Headers = undefined;

    buildAuthorizationHeader() : void{

        let headers = new Headers();
        headers.append('Authorization', 
        'JWT ' + localStorage.getItem('access_token')); 
        this.headers = headers;
    }

    getCereal() {
        return this.http.get(this.API_BASE + "cereal/get/")
        .map((res:Response) => res.json());
    }

    getCerealWithId(id : number) {
        return this.http.get(this.API_BASE + "cereal/get/" + id + "/")
        .map((res:Response) => res.json());
    }

    getMilk() {
        return this.http.get(this.API_BASE + "milk/get/")
        .map((res:Response) => res.json());
    }

    getMilkWithId(id : number) {
        return this.http.get(this.API_BASE + "milk/get/" + id + "/")
        .map((res:Response) => res.json());
    }

    getTopping() {
        return this.http.get(this.API_BASE + "topping/get/")
        .map((res:Response) => res.json());
    }

    getToppingWithId(id : number) {
        return this.http.get(this.API_BASE + "topping/get/" + id + "/")
        .map((res:Response) => res.json());
    }

    createOrder(){
        this.buildAuthorizationHeader();
        return this.http.get(this.API_BASE + "order/new/",
        { headers: this.headers }) 
        .map((res:Response) => res.json());
    }

    updateOrder(orderId : Number, orderItems : String){
        this.buildAuthorizationHeader();
        return this.http.post(this.API_BASE + `order/${orderId}/update/cart/`,
        orderItems,
        { headers: this.headers });
        
    }

    setOrderStatus(orderId : Number, status: String){
        this.buildAuthorizationHeader();
        return this.http.get(this.API_BASE + `order/${orderId}/update/status/${status}`,
        { headers: this.headers });

    }

}


