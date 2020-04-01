import { OrderView } from "./OrderView.js";
import { OrderModel } from "./OrderModel.js";

export class OrderController {
  constructor({subscribe,notify}) {
    this.view = new OrderView(this.handleOrder, this.closeOrder, this.getCartData);
    this.model = new OrderModel();

    this.sendUrl = 'http://localhost:3003/orders';

    this.notify = notify;
    this.subscribe = subscribe;

    this.subscribe('closeOrderForm', this.closeOrder);
    this.subscribe('sendCartData', this.orderDataInit);

    this.sendOrderToServer = this.sendOrderToServer.bind(this);
  }

  /**
   * Create order function
   */
  handleOrder = () => {
    if(!this.model.orderDataLength){
      return this.notify('popup', 'Your cart is empty <i class="fa fa-box-open"></i>');
    }

    if (!this.model.validateOrderForm(this.view.inputsData)){
      return this.notify('popup', 'Incorrect input, please try again <i class="fa fa-tired"></i>');
    }
    this.sendOrderToServer().then(res => {
      if(res.status === 200) {
        this.notify('confirmOrder', null);
        this.notify('popup', 'Your order confirmed <i class="fa fa-thumbs-up"></i>');
        this.model.saveOrderDataToLocalStorage(this.view.inputsData);
        this.view.closeForm();
        this.notify('closeCart', null);
        this.notify('refreshData', null);
      }
      else{
        this.notify('popup', `Error (${res.status}): ${res.statusText} <i class="fa fa-thumbs-down"></i>`);
      }
    }).catch(err =>{
      this.notify('popup', `Unknown server error: ${err.statusText || 'unknown'} <i class="fa fa-thumbs-down"></i>`);
    });
  }

  closeOrder = () =>{
    this.view.closeForm();
  }

  getCartData = () =>{
    this.notify('getCartData', null);
  }

  /**
   *  Init data from cart, where ordering
   * @param data:Array of Animals {id, counter}
   */
  orderDataInit = (data) =>{
    this.model.dataInit(data);
  }

  /**
   * Send order to back
   * @returns {Promise<Response>}
   */
  async sendOrderToServer(){
    const inputsValue = this.view.inputsData;
    const cartData = this.model.currentData;
    const data = {
      customer:{
        name: inputsValue.name,
        email: inputsValue.email,
        phone: inputsValue.phone,
      },
      items: cartData.data,
      price: cartData.price.toFixed(2),
    };
    const response = await fetch(this.sendUrl, {
      method: 'POST',
      cache: 'no-cache',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data),
    })
    return response
  }
}