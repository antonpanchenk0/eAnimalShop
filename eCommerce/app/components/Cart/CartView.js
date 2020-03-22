export class CartView{
    constructor(cartOpenListener, cartCloseListener){
        this.cartBox = document.querySelector('div.cart');
        this.cartCounterBlock = document.querySelector('p#c-counter');
        this.cartModal = document.querySelector('div.cart-modal');
        this.cartModalHeader = this.cartModal.querySelector('.modal-title');
        this.cartModalBody = this.cartModal.querySelector('.modal-body');

        this.cartBox.addEventListener('click', cartOpenListener);
        $(this.cartModal).on('hidden.bs.modal', cartCloseListener);
    }

    updateCartCounter = (num) =>{
        this.cartCounterBlock.innerHTML = num;
    }

    renderData = (data) =>{
        data.forEach(item =>{this.cartModalBody.appendChild(this.renderSinglePosition(item))});
    }

    renderSinglePosition = (position) =>{
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
              <div class="switch-count d-flex justify-content-center align-items-center">
              <a href="#" class="count-switch" data-id="minus">-</a>
              <p class="count-now">${position.counter}</p>
              <a href="#" class="count-switch" data-id="plus">+</a>
              </div>
              <div class="remove-animal ml-3">
                <a href="#" class="rm-btn">❌</a>
              </div>
        </div>
        `;
        return node;
    }

    open = (data, price) =>{
        this.cartModalHeader.innerHTML = `🛒 <span style="color: #ffc000">Total price:  ${price}$ </span>🛒 `;
        this.renderData(data);
        $(this.cartModal).modal('show');
    };

    close(){
        this.cartModalBody.innerHTML = '';
        this.cartModalHeader.innerHTML = '';
    }

}