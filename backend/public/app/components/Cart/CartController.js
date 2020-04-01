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

  /**
   * Add to cart new item
   * @param data:object of Animal
   */
  addToCart = (data) => {
    if(this.model.add(data)){
      this.model.updateSessionStorage();
      this.updateCartCounter();
      this.notify('popup', `Animal ${data.name}, added to cart.`);
    } else{
      this.notify('popup', 'You have reached the maximum quantity of this item available for purchase.');
    }
  };

  /**
   * Update cart counter in cart icon
   */
  updateCartCounter = () => {
    this.view.updateCartCounter(this.model.cartCounter); //cartCounter - number of elements in cart
  };

  /**
   * Increment cart position
   * @param animalId:number
   */
  incrementPosition = (animalId) => {
    if(this.model.incrementPos(animalId)){
      this.model.updateSessionStorage();
      this.updateCartCounter();
      this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
    } else{
      this.notify('popup', 'You have reached the maximum quantity of this item available for purchase.');
    }
  }

  /**
   * Decrement cart position
   * @param animalId:number
   */
  decrementPosition = (animalId) => {
    const res = this.model.decrementPos(animalId);
    this.model.updateSessionStorage();
    this.updateCartCounter();
    this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
  }

  /**
   * Delete position in cart
   * @param animalId:number
   */
  deletePosition = (animalId) => {
    this.model.deletePos(animalId);
    this.model.updateSessionStorage();
    this.updateCartCounter();
    this.view.renderData(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
  }

  /**
   * Event on click cart button
   */
  openCart = () => {
    this.view.open(this.model.cartData, this.model.calcSum); //arguments(current state of data in cart, current total price)
  }

  /**
   * Event on close cart modal window
   */
  closeCart = () => {
    this.view.close();
    this.notify('closeOrderForm', null);
  }

  /**
   * Full clear cart data
   */
  clearCart = () =>{
    this.model.removeCartData();
    this.model.updateSessionStorage();
    this.updateCartCounter();
    this.view.renderData(this.model.cartData, this.model.calcSum);
  }

  /**
   * Get main data from renderController
   * @param data
   */
  catchData = (data) =>{
    this.model.catchData(data);
    this.model.updateData();
  }

  /**
   * Sending data to orderController
   */
  sendData = () =>{
    this.notify('sendCartData', {data: this.model.shortCartData, price: this.model.calcSum});
  }

}