
import { Injectable } from '@angular/core';   
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { ContextService } from './Context.service'

import { APP_CONFIG } from '../constants/AppConfig'

@Injectable()
export class PaymentService {

    constructor(private _context : ContextService, private http: Http ){
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

    processPayment(orderId : Number, token: any, amount :  number){

        const payment = {
            'token': token,
            'amount': amount
        }

        return this.http.post( this.API_BASE + `order/${orderId}/pay/`,payment,
            { headers: this.headers});

    }

}