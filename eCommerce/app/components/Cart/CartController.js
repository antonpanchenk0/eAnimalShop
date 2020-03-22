import {CartView} from "./CartView.js";
import {CartModel} from "./CartModel.js";

export class CartController{
    constructor({subscribe}){
        this.view = new CartView(this.openCart, this.closeCart, this.incrementPosition, this.decrementPosition, this.deletePosition);
        this.model = new CartModel();

        this.subscribe = subscribe;
        this.subscribe('addToCart', this.addToCart);
        this.subscribe('loadCartFromSessionStorage', this.loadCart);
    }

    //add to cart new item
    addToCart = (data) =>{
        this.model.add(data);
        this.model.updateSessionStorage(this.model.cartData);
        this.updateCartCounter();
    };

    //update cart counter in DOM
    updateCartCounter = () =>{
        this.view.updateCartCounter(this.model.cartCounter); //cartCounter - number of elements in cart
    };

    //incrementing positions in cart
    incrementPosition = (data) =>{
        this.model.incrementPos(data);
        this.model.updateSessionStorage(this.model.cartData);
        this.updateCartCounter();
        this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
    }

    //decrementing position  in cart
    decrementPosition = (data) =>{
        this.model.decrementPos(data);
        this.model.updateSessionStorage(this.model.cartData);
        this.updateCartCounter();
        this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
    }

    //delete position in cart
    deletePosition = (data) =>{
        this.model.deletePos(data);
        this.model.updateSessionStorage(this.model.cartData);
        this.updateCartCounter();
        this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
    }

    //open cart
    openCart = () =>{
        this.view.open(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
    }

    //close cart
    closeCart = () =>{
        this.view.close();
    }

    //load cart from sessionStorage
    loadCart = (data) =>{
        this.model.load(data);
        this.updateCartCounter();
        this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
    }
}