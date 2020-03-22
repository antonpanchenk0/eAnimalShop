import {CartView} from "./CartView.js";
import {CartModel} from "./CartModel.js";

export class CartController{
    constructor({subscribe}){
        this.view = new CartView(this.openCart, this.closeCart);
        this.model = new CartModel();

        this.subscribe = subscribe;
        this.subscribe('addToCart', this.addToCart);
    }

    //add to cart new item
    addToCart = (data) =>{
        this.model.add(data);
        this.updateCartCounter();
    };


    updateCartCounter = () =>{
        this.view.updateCartCounter(this.model.cartCounter);
    };

    openCart = () =>{
        const data = this.model.cartData; //Get cart data
        const price = this.model.priceCounter; //Get price all positions on cart
        this.view.open(data, price);
    }

    closeCart = () =>{
        this.view.close();
    }
}