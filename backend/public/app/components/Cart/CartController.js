import {CartView} from "./CartView.js";
import {CartModel} from "./CartModel.js";

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
    this.subscribe('getCartData', this.sendData);
    this.subscribe('closeCart', this.closeCart);
  }

  //add to cart new item
  addToCart = (data) => {
    if(this.model.add(data)){
      this.model.updateSessionStorage();
      this.updateCartCounter();
      this.notify('popup', `Animal ${data.name}, added to cart.`);
    } else{
      this.notify('popup', 'You have reached the maximum quantity of this item available for purchase.');
    }
  };

  //update cart counter in DOM
  updateCartCounter = () => {
    this.view.updateCartCounter(this.model.cartCounter); //cartCounter - number of elements in cart
  };

  //incrementing positions in cart
  incrementPosition = (data) => {
    if(this.model.incrementPos(data)){
      this.model.updateSessionStorage();
      this.updateCartCounter();
      this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
    } else{
      this.notify('popup', 'You have reached the maximum quantity of this item available for purchase.');
    }
  }

  //decrementing position  in cart
  decrementPosition = (data) => {
    const res = this.model.decrementPos(data);
    this.model.updateSessionStorage();
    this.updateCartCounter();
    this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
  }

  //delete position in cart
  deletePosition = (data) => {
    this.model.deletePos(data);
    this.model.updateSessionStorage();
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
    this.notify('closeOrderForm', null);
  }

  clearCart = () =>{
    this.model.removeCartData();
    this.model.updateSessionStorage();
    this.updateCartCounter();
    this.view.renderData(this.model.cartData, this.model.calcSum);
  }

  //get main data from renderController
  catchData = (data) =>{
    this.model.catchData(data);
    this.model.updateData();
  }

  sendData = () =>{
    this.notify('sendCartData', {data: this.model.shortCartData, price: this.model.calcSum});
  }

}