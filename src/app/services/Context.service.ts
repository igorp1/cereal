import { Injectable } from '@angular/core';   
import { Http, Response } from '@angular/http';  
import { APP_CONFIG } from '../constants/AppConfig'
import { CerealAPIService } from './CerealAPI.service'
import { CartService } from './Cart.service'



@Injectable()
export class ContextService {

    /***** CONTRUCTOR *****/
    constructor (
        private _cereal:    CerealAPIService,
        private _cart:      CartService      
    ) {  
        this.loadStateFromLocalStorage()
    }

    // public member variables 
    public lastPageVisited : String;
    public todaysColor : String = APP_CONFIG.WeekdayColor

    // public API
    public visiting(page : String){
        this.lastPageVisited = page;
        this.persistState();
    }

    // private methods
    private loadStateFromLocalStorage() {
        
        let context_json_str = localStorage.getItem('CEREAL_APP_CONTEXT');

        if(context_json_str){
            let context_json = JSON.parse(context_json_str);

            this.visiting(context_json.lastPageVisited); 
        }
    }

    private persistState(){

        let save_json = {
            'lastPageVisited' : this.lastPageVisited
        }

        localStorage.setItem('CEREAL_APP_CONTEXT', JSON.stringify(save_json));

    }

}