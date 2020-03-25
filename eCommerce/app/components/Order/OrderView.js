export class OrderView {
  constructor(listener) {
    this.checkout = document.querySelector('#checkout');
    this.orderForm = document.querySelector('#cartForm');
    this.orderCansel = document.querySelector('#orderCansel');
    this.orderSuccess = document.querySelector('#orderSuccess');
    this.orderAnnotation = document.querySelector('#orderAnnotation');

    this.mistakeMsg = 'Incorrect input, pls try again';
    this.defaultMsg = 'Enter your credentials to submit the order';
    this.successMsg = 'Your order is done, thank you! Maybe another one?';

    this.checkout.addEventListener('click', () => {
      // making form and msg visible
      this.orderForm.classList.remove('d-none');
      this.orderAnnotation.classList.remove('d-none');

      this.changeAnnotation(this.defaultMsg);
      
    });

    this.orderCansel.addEventListener('click', () => {
      // making form and msg invisible
      this.orderForm.classList.add('d-none');
      this.orderAnnotation.classList.add('d-none');

      this.changeAnnotation(this.defaultMsg);
      this.clearInputs();
    });

    this.orderSuccess.addEventListener('click', () => {
      listener();
      this.clearInputs(); 
    });
  }

  // changing msg that customer see
  changeAnnotation(msg) {
    this.orderAnnotation.innerText = `${msg}`;
  }

  // making input values clear after submitting or canceling
  clearInputs() {
    this.orderForm.customerPhone.value = '';
    this.orderForm.customerEmail.value = '';
    this.orderForm.customerName.value = '';
  }
}