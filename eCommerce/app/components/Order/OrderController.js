import { OrderView } from "./OrderView.js";
import { OrderModel } from "./OrderModel.js";

export class OrderController {
  constructor({notify}) {
    this.view = new OrderView(this.handleOrder);
    this.model = new OrderModel();

    this.notify = notify;
  }

  handleOrder = () => {
    if (
      this.model.validateOrderForm({
        name: this.view.orderForm.customerName.value,
        email: this.view.orderForm.customerEmail.value,
        phone: this.view.orderForm.customerPhone.value,
      })
    ) {
      this.view.changeAnnotation('incorrect input, pls try again');
      this.notify('confirmOrder', null);
    } else {
      this.model.orderMistake();
    }
  }
}