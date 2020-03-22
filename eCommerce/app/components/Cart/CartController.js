import {CartView} from "./CartView.js";
import {CartModel} from "./CartModel.js";

export class CartController{
    constructor({subscribe}){
        this.view = new CartView(this.openCart, this.closeCart, this.incrementPosition, this.decrementPosition, this.deletePosition);
        this.model = new CartModel();

        this.subscribe = subscribe;
        this.subscribe('addToCart', this.addToCart);
    }

    //add to cart new item
    addToCart = (data) =>{
        this.model.add(data);
        this.updateCartCounter();
    };

    //update cart counter in DOM
    updateCartCounter = () =>{
        this.view.updateCartCounter(this.model.cartCounter);
    };

    incrementPosition = (data) =>{
        this.model.incrementPos(data);
        this.updateCartCounter();
        this.view.renderData(this.model.cartData, this.model.priceCounter);
    }

    decrementPosition = (data) =>{
        this.model.decrementPos(data);
        this.updateCartCounter();
        this.view.renderData(this.model.cartData, this.model.priceCounter);
    }

    deletePosition = (data) =>{
        this.model.deletePos(data);
        this.updateCartCounter();
        this.view.renderData(this.model.cartData, this.model.priceCounter);
    }

    openCart = () =>{
        const data = this.model.cartData; //Get cart data
        const price = this.model.priceCounter; //Get price all positions on cart
        this.view.open(data, price);
    }

    closeCart = () =>{
        this.view.close();
    }
}