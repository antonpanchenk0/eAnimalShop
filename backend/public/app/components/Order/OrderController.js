import { OrderView } from "./OrderView.js";
import { OrderModel } from "./OrderModel.js";

export class OrderController {
  constructor({subscribe,notify}) {
    this.view = new OrderView(this.handleOrder, this.closeOrder, this.getCartData);
    this.model = new OrderModel();

    this.notify = notify;
    this.subscribe = subscribe;

    this.subscribe('closeOrderForm', this.closeOrder);
    this.subscribe('sendCartData', this.orderDataInit);
  }

  handleOrder = () => {
    if(!this.model.orderDataLength){
      return this.notify('popup', 'Your cart is empty <i class="fa fa-box-open"></i>');
    }

    if (!this.model.validateOrderForm(this.view.inputsData)){
      return this.notify('popup', 'Incorrect input, please try again <i class="fa fa-tired"></i>');
    }
    this.model.saveOrderDataToLocalStorage(this.view.inputsData);
    this.notify('confirmOrder', null);
    this.notify('popup', 'Your order confirmed <i class="fa fa-thumbs-up"></i>');
    this.view.closeForm();
    this.notify('closeCart', null);
  }

  closeOrder = () =>{
    this.view.closeForm();
  }

  getCartData = () =>{
    this.notify('getCartData', null);
  }

  orderDataInit = (data) =>{
    this.model.dataInit(data);
  }
}