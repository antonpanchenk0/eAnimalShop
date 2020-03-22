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

    renderSinglePosition = (position) =>{

    }

    open = (data, num, price) =>{
        this.cartModalHeader.innerHTML = `Your cart | ${num} animals | ${price}$`;
        $(this.cartModal).modal('show');
    };

    close(){
        this.cartModalBody.innerHTML = '';
        this.cartModalHeader.innerHTML = '';
    }

}