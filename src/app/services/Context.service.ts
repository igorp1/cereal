import { Injectable } from '@angular/core';   
import { Http, Response } from '@angular/http';  
import { APP_CONFIG } from '../constants/AppConfig'
import { CerealAPIService } from './CerealAPI.service'
import { CartService } from './Cart.service'

import { AuthService } from './auth/auth.service';


@Injectable()
export class ContextService {

    /***** CONTRUCTOR *****/
    constructor (
        private  auth:      AuthService,
        private _cereal:    CerealAPIService,
        private _cart:      CartService      
    ) {  
        this.loadStateFromLocalStorage();
        this.loadUserProfile();
    }

    // public member variables 
    public lastPageVisited : String;
    public todaysColor : String = APP_CONFIG.WeekdayColor
    public profile : any;
    public loadingProfile : boolean;

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

    private loadUserProfile(){
        let self = this;
        setTimeout(()=>{
            if (self.auth.userProfile) {
                self.profile = self.auth.userProfile;
                this.loadingProfile = false;
            } 
            else {
                if(localStorage.getItem('access_token')){
                    self.auth.getProfile((err, profile) => {
                        self.profile = profile;
                        this.loadingProfile = false;
                    });
                }
                else{
                    // not logged in.
                    this.loadingProfile = false;
                }
            }
        }, 500); 
    }

}