export class OrderModel {
  constructor() {
    this.data = {};
    this.regExpOrderForm = {
      name: /[a-zа-яA-ZА-Я]{1,}/,
      email: /[a-z0-9._]+@([a-z]+.)+([a-z])/i,
      phone:/^\d{12}$/
    }
  }

  get orderDataLength(){
    return this.data.data.length;
  }

  validateOrderForm({name, email, phone}) {
    return this.validateName(name) && this.validateEmail(email) && this.validatePhone(phone);
  }

  validateName = (name) => name.match(this.regExpOrderForm.name) ? true : false;
  validateEmail = (email) => email.match(this.regExpOrderForm.email) ? true : false;
  validatePhone = (phone) => phone.match(this.regExpOrderForm.phone) ? true : false;

  dataInit(data){
    this.data = data;
  }

  saveOrderDataToLocalStorage = ({name, email, phone}) =>{
    const temp = JSON.parse(localStorage.getItem('ordersHistory')) || [];
    temp.push({
      name,
      email,
      phone,
      order: this.data,
    });
    localStorage.setItem('ordersHistory', JSON.stringify(temp));
  }
}