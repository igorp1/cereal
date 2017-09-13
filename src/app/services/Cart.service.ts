import { Injectable } from '@angular/core';   
import { Http, Response } from '@angular/http';  
import { APP_CONFIG } from '../constants/AppConfig';
import { CerealAPIService } from './CerealAPI.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class CartService {
    
    constructor ( private _cereal: CerealAPIService,
        private auth : AuthService) { 
        this.loadFromStorage();
    }

    private cartItems : Array<any> = [];

    public cereal : Array<any> = [];
    public milk : Array<any> = [];
    public toppings : Array<any> = [];

    public cartID : Number = null;
    public creatingNewOrder : boolean = false;

    public addToCart(new_item){ 

        if(!this.isInCart(new_item)){ 
            this.cartItems.push(new_item); 
        }
        else { 
            this.persist();
            return;
        }

        if(new_item.model.indexOf('.cereal') != -1 ){
            if(APP_CONFIG.isDev) console.log(new_item)
            this.cereal.push(new_item); 
        }
        else if(new_item.model.indexOf('.milk') != -1 ){
            if(APP_CONFIG.isDev) console.log(new_item)
            this.milk.push(new_item); 
        }
        else if(new_item.model.indexOf('.topping') != -1 ){
            if(APP_CONFIG.isDev) console.log(new_item)
            this.toppings.push(new_item);
        }

        this.persist();

    }

    public removeFromCart(item) {
        
        if(item.count == 0){
            throw new Error(`The item ${item.fields.name} has not reached a count of 0 but is going to be removed from the cart.`);
        }
        
        for(let i=0; i<this.cartItems.length; i++){
            if(this.cartItems[i].fields.name == item.fields.name){
                this.cartItems.splice(i, 1);
            }
        }

        if(item.model.indexOf('.cereal') != -1 ){
            if(APP_CONFIG.isDev) console.log(item);
            for(let i=0; i<this.cereal.length; i++){
                if(this.cereal[i].fields.name == item.fields.name){
                    this.cereal.splice(i, 1);
                }
            }
        }
        else if(item.model.indexOf('.milk') != -1 ){
            if(APP_CONFIG.isDev) console.log(item)
            for(let i=0; i<this.milk.length; i++){
                if(this.milk[i].fields.name == item.fields.name){
                    this.milk.splice(i, 1);
                }
            }
        }
        else if(item.model.indexOf('.topping') != -1 ){
            if(APP_CONFIG.isDev) console.log(item);
            for(let i=0; i<this.toppings.length; i++){
                if(this.toppings[i].fields.name == item.fields.name){
                    this.toppings.splice(i, 1);
                }
            }
        }

        this.persist();

    }

    public getCerealStrings(){
        let str_list : Array<string> = [];

        this.cereal.forEach(e =>
            str_list.push(e.count + " x " + e.fields.name )
        );

        return str_list;
    }

    public getMilkStrings(){
        let str_list : Array<string> = [];

        this.milk.forEach(e =>
            str_list.push(e.count + " x " + e.fields.name )
        );

        return str_list;
    }

    public getToppingsStrings(){
        let str_list : Array<string> = [];

        this.toppings.forEach(e =>
            str_list.push(e.count + " x " + e.fields.name )
        );

        return str_list;
    }

    public updateLoadedItems(items_array, modelName){

        this.cartItems.forEach( e => { 
            if(e.model.indexOf(modelName) != -1 ){ 
                for(let ii=0; ii < items_array.length; ii++){ 
                    if(items_array[ii].pk == e.pk && items_array[ii].model == e.model ){
                        items_array[ii].count = e.count;
                    }
                }
            }
        });

        return items_array
    }

    public calculateTotal(){
        
        let total = 0;
        let DELIVERY = 3;

        this.cartItems.forEach( ii => {
            total += ii.fields.price * ii.count;
        });

        return total + DELIVERY;        

    }

    public pushCartItemsToServer(cartID : Number){

        if(this.cartItems.length != 0){
            // stringfy the cart
            let orderItems = JSON.stringify(this.cartItems)

            // push order items to server =>
            this._cereal.updateOrder(cartID, orderItems)
            .subscribe( )
        }

    }

    public persist(){
        localStorage.setItem('CEREAL_CART', JSON.stringify(this.cartItems));
        if(this.cartID != null) {
            localStorage.setItem('CEREAL_CART_ID', String(this.cartID) );
        }
        this.persistOnServer()
    }

    public setOrderStatus(status : string){
        if(!this.cartID) throw "Card Id is not present. Cannot complete request."
        this._cereal.setOrderStatus(this.cartID, status)
        .subscribe()    
    }

    private isInCart(new_item): boolean {
        let exists = false;
        this.cartItems.forEach(element => {
            if(element.fields.name == new_item.fields.name){
                exists = true;
            }
        });
        return exists;
    }

    private loadFromStorage(){
        
        this.cartID = localStorage.getItem('CEREAL_CART_ID') ? 
                        Number(localStorage.getItem('CEREAL_CART_ID')) 
                        : null;
        let cartItemsPersistedString = localStorage.getItem('CEREAL_CART');
        
        if(cartItemsPersistedString){
            let cartItemsPersisted = JSON.parse(cartItemsPersistedString);
            cartItemsPersisted.forEach(ii => {
                this.addToCart(ii);
            });
        }
        
    }

    private persistOnServer(){
        if(this.creatingNewOrder){ return; }
        if(localStorage.getItem('access_token') == null){ return; }
        if(this.cartID){ 
            this.pushCartItemsToServer(this.cartID)
        }
        else{
           
            let self = this
            this.creatingNewOrder = true;
            this._cereal.createOrder().subscribe(d => {
                self.cartID = d; 
                this.creatingNewOrder = false;
                self.persist();
                self.pushCartItemsToServer(this.cartID)
            })
            
        }
    }

}
