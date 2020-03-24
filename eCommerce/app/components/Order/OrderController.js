import { OrderView } from "./OrderView.js";
import { OrderModel } from "./OrderModel.js";

export class OrderController {
  constructor() {
    this.view = new OrderView(this.handleOrder);
    this.model = new OrderModel();
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
    } else {
      this.model.orderMistake();
    }
  }
}