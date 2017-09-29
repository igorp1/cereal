import { Injectable } from '@angular/core';   
import { Http, Response } from '@angular/http';  
import { AuthService } from './auth/auth.service';

import { CerealAPIService } from './CerealAPI.service';
import { UserAPIService } from './UserAPI.service';
import { CartService } from './Cart.service';

import { APP_CONFIG } from '../constants/AppConfig';


@Injectable()
export class ContextService {

    /***** CONTRUCTOR *****/
    constructor (
        private  auth:      AuthService,
        private _cereal:    CerealAPIService,
        private _cart:      CartService,
        private _user:      UserAPIService      
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

    public isUserAdmin(){
        return this.doesUserHaveScope('admin')
    }

    public isUserDelivery(){
        return this.doesUserHaveScope('delivery')
    }

    public loadAPPConfig(){
        return APP_CONFIG;
    }

    // private member variables
    private userScopes : Array<any> = []

    // private methods
    private doesUserHaveScope(scopeName:String){
        let check_result = false
        this.userScopes.forEach(e => {
            if(e == scopeName){
                check_result = true
            }
        })    
        return check_result;
    }

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
                self.loadingProfile = false;
                self.loadUserScope();
            } 
            else {
                if(localStorage.getItem('access_token')){
                    self.auth.getProfile((err, profile) => {
                        if(err){
                            // clean up expired access_token
                            localStorage.clear()
                        }
                        else{
                            self.profile = profile;
                            self.loadingProfile = false;
                            self.loadUserScope();
                            self.registerEmail(profile['email']);
                        }
                    });
                }
                else{
                    localStorage.clear()
                    // not logged in.
                    this.loadingProfile = false;
                }
            }
        }, 500); 
    }

    private loadUserScope(){
        this._user.buildAuthorizationHeader()
        this._user.getUserScopes().subscribe(data => { this.userScopes = data });    
    }

    private registerEmail(email : string){
        this._user.registerEmail(email).subscribe()
    }
}