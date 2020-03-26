export class OrdersHistoryView {
    constructor(openHistoryListener){
        this.historyBtn = document.querySelector('#orderListBox');
        this.modalWindow = document.querySelector('#orderListModalWindow');
        this.modalBody = this.modalWindow.querySelector('div.modal-body');

        this.historyBtn.addEventListener('click', openHistoryListener);
    }

    render = (data) =>{
        data.forEach(item=>{
            this.renderSinglePosition(item);
        });
    }

    renderSinglePosition = (item) =>{
        console.log(item.name);
        console.log(item.email);
        console.log(item.phone);
        console.log(item.price);
        item.order.forEach(elem=>{
            console.log(elem.pos.species);
            console.log(elem.pos.breed);
        })
        console.log('ORDERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
    }

    open = (data) =>{
        this.render(data);
        $(this.modalWindow).modal('show');
    }
}