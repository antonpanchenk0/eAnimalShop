export class OrderView {
  constructor(listener, closeListener, getDataListener) {
    this.checkout = document.querySelector('#checkout');
    this.orderBlock = document.querySelector('#orderBlock');
    this.orderForm = document.querySelector('#cartForm');
    this.orderCancel = document.querySelector('#orderCancel');
    this.orderSuccess = document.querySelector('#orderSuccess');


    this.checkout.addEventListener('click', this.showForm);

    this.orderCancel.addEventListener('click', closeListener);

    this.orderSuccess.addEventListener('click', () => { getDataListener(); listener(); });
  }

  get inputsData(){
    return {
      name: this.orderForm.customerName.value,
      email: this.orderForm.customerEmail.value,
      phone: this.orderForm.customerPhone.value,
    }
  }

  // making input values clear after submitting or canceling
  clearInputs() {
    this.orderForm.customerPhone.value = '';
    this.orderForm.customerEmail.value = '';
    this.orderForm.customerName.value = '';
  }

  showForm = () =>{
    this.orderBlock.classList.remove('d-none');
  }

  closeForm(){
    // making form and msg invisible
    this.orderBlock.classList.add('d-none');
    this.clearInputs();
  }
}