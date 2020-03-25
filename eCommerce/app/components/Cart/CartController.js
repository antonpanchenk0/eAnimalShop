import {
  CartView
} from "./CartView.js";
import {
  CartModel
} from "./CartModel.js";

export class CartController {
  constructor({subscribe, notify}) {
    this.view = new CartView({
      open: this.openCart,
      close: this.closeCart,
      increment: this.incrementPosition,
      decrement: this.decrementPosition,
      del: this.deletePosition,
    });
    this.model = new CartModel();


    this.updateCartCounter();
    this.subscribe = subscribe;
    this.notify = notify;
    this.subscribe('addToCart', this.addToCart);
    this.subscribe('confirmOrder', this.clearCart);
    this.subscribe('transferData', this.catchData);
  }

  //add to cart new item
  addToCart = (data) => {
    this.model.add(data);
    this.model.updateSessionStorage(this.model.cartData);
    this.updateCartCounter();
  };

  //update cart counter in DOM
  updateCartCounter = () => {
    this.view.updateCartCounter(this.model.cartCounter); //cartCounter - number of elements in cart
  };

  //incrementing positions in cart
  incrementPosition = (data) => {
    this.model.incrementPos(data);
    this.model.updateSessionStorage(this.model.cartData);
    this.updateCartCounter();
    this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
  }

  //decrementing position  in cart
  decrementPosition = (data) => {
    this.model.decrementPos(data);
    this.model.updateSessionStorage(this.model.cartData);
    this.updateCartCounter();
    this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
  }

  //delete position in cart
  deletePosition = (data) => {
    this.model.deletePos(data);
    this.model.updateSessionStorage(this.model.cartData);
    this.updateCartCounter();
    this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
  }

  //open cart
  openCart = () => {
    this.view.open(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
  }

  //close cart
  closeCart = () => {
    this.view.close();
    this.notify('cartClose', null);
  }

  clearCart = () =>{
    this.model.removeCartData();
    this.model.updateSessionStorage(this.model.cartData);
    this.updateCartCounter();
    this.view.renderData(this.model.cartData, this.model.calcSum);
  }

  //get main data from renderController
  catchData = (data) =>{
    this.model.catchData(data);
    this.model.updateData();
  }

}