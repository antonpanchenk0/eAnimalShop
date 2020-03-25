export class CartView {
  constructor(cBacks) {
    this.cartBox = document.querySelector('div.cart');
    this.cartCounterBlock = document.querySelector('p#c-counter');
    this.cartModal = document.querySelector('div.cart-modal');
    this.cartModalHeader = this.cartModal.querySelector('.modal-title');
    this.cartModalBody = this.cartModal.querySelector('.modal-body');

    this.cBacks = cBacks; //object with callback functions from CartController

    this.cartBox.addEventListener('click', this.cBacks.open);
    $(this.cartModal).on('hidden.bs.modal', this.cBacks.close); //bootstrap4 modalWindow close event
  }

  updateCartCounter = (num) => {
    this.cartCounterBlock.innerHTML = num;
  }

  renderData = (data, price) => {
    this.cartModalHeader.innerHTML = `🛒 <span style="color: #ffc000">Total price:  ${price}$ </span>🛒 `;
    this.cartModalBody.innerHTML = '';
    data.forEach(item => {
      this.cartModalBody.appendChild(this.renderSinglePosition(item))
    });
  }

  renderSinglePosition = (position) => {
    const node = document.createElement('div');
    node.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'col-12');
    node.innerHTML = `
        <div class="animal-shortcut" style="background-image: url(${position.data.image})"></div>
            <div class="animal-description d-flex flex-column justify-content-start align-items-center">
                <h2 class="text-center">${position.data.name}</h2>
                <h3 class="text-center">${position.data.breed}</h3>
                <p class="m-0 text-center">${position.data.price}$</p>
            </div>
            <div class="animal-toglers d-flex justify-content-center align-items-center">
              <div class="switch-count-block d-flex justify-content-center align-items-center">
              <a href="#" class="cart-count-switch-btn cart-decrement-btn" data-id="minus">-</a>
              <p class="count-now">${position.counter}</p>
              <a href="#" class="cart-count-switch-btn cart-increment-btn" data-id="plus">+</a>
              </div>
              <div class="remove-animal ml-3">
                <a href="#" class="cart-remove-btn">❌</a>
              </div>
        </div>
        `;
    node.querySelector('a.cart-increment-btn').addEventListener('click', e => {
      this.cBacks.increment(position.data.id);
    });
    node.querySelector('a.cart-decrement-btn').addEventListener('click', e => {
      this.cBacks.decrement(position.data.id);
    });
    node.querySelector('a.cart-remove-btn').addEventListener('click', e => {
      e.preventDefault();
      this.cBacks.del(position.data.id);
    });
    return node;
  }

  open = (data, price) => {
    this.renderData(data, price);
    $(this.cartModal).modal('show');
  };

  close() {
    this.cartModalBody.innerHTML = '';
    this.cartModalHeader.innerHTML = '';
  }

}