import { Injectable } from '@angular/core';   
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { APP_CONFIG } from '../constants/AppConfig'

@Injectable()
export class CerealAPIService {
    constructor ( private http: Http ) {
        this.API_BASE = APP_CONFIG.isDev ? APP_CONFIG.ApiUris.dev : APP_CONFIG.ApiUris.prod;
    }

    private is_dev : boolean = true;
    private API_BASE : String;

    getCereal() {
        return this.http.get(this.API_BASE + "cereal/get/")
        .map((res:Response) => res.json());
    }

    getCerealWithId(id : number) {
        return this.http.get(this.API_BASE + "cereal/get/" + id + "/");
    }

    getMilk() {
        return this.http.get(this.API_BASE + "milk/get/")
        .map((res:Response) => res.json());
    }

    getMilkWithId(id : number) {
        return this.http.get(this.API_BASE + "milk/get/" + id + "/");
    }

    getTopping() {
        return this.http.get(this.API_BASE + "topping/get/")
        .map((res:Response) => res.json());
    }

    getToppingWithId(id : number) {
        return this.http.get(this.API_BASE + "topping/get/" + id + "/");
    }

    addToCart(item :  any){

        // for now, this is gonna be empty, 
        // I wanna finish the whole front end 
        // then come back to add functionality back here

    }


}


