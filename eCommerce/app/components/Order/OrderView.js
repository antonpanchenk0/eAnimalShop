export class OrderView {
  constructor(listener) {
    this.checkout = document.querySelector('#checkout');
    this.orderForm = document.querySelector('#cartForm');
    this.orderCansel = document.querySelector('#orderCansel');
    this.orderSuccess = document.querySelector('#orderSuccess');
    this.orderAnnotation = document.querySelector('#orderAnnotation');

    this.checkout.addEventListener('click', () => this.orderForm.classList.remove('invisible'));
    this.orderCansel.addEventListener('click', () => {
      this.orderForm.classList.add('invisible');
      this.changeAnnotation('Enter your credentials to submit the order');
    });
    this.orderSuccess.addEventListener('click', listener);
  }

  changeAnnotation(msg) {
    this.orderAnnotation.innerText = `${msg}`;
  }
}