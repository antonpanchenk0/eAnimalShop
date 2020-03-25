export class OrderModel {
  constructor() {

  }

  validateOrderForm({name, email, phone}) {
    return this.validateName(name) && this.validateEmail(email) && this.validatePhone(phone);
  }

  validateName(name) {
    if(!name.length) {
      return false
    }

    return true;
  }

  validateEmail(email) {
    if(!email.length) {
      return false;
    }
    
    return true;
  }

  validatePhone(phone) {
    if(!phone.length) {
      return false;
    }
    
    return true;
  }
}