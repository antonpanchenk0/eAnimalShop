export class OrdersHistoryView {
    constructor(openHistoryListener, closeHistoryListener){
        this.historyBtn = document.querySelector('#orderListBox');
        this.modalWindow = document.querySelector('#orderListModalWindow');
        this.modalBody = this.modalWindow.querySelector('div.modal-body');
        this.historyCounter = document.querySelector('#oCounter');

        this.historyBtn.addEventListener('click', openHistoryListener);
        $(this.modalWindow).on('hidden.bs.modal', closeHistoryListener); //bootstrap4 modalWindow close event
    }

    /**
     * render order history window
     * @param data:[{name:string,email:string,phone:string,order:[],price:double}]
     */
    render = (data) =>{
        data.forEach(item=>{
            this.modalBody.appendChild(this.renderSinglePosition(item));
        });
    }

    /**
     * create single element for order history
     * @param item:object
     * @returns {HTMLDivElement}
     */
    renderSinglePosition = (item) =>{
        const node = document.createElement('div');
        node.classList.add('order-item', 'd-flex', 'flex-nowrap', 'row', 'm-0', 'p-0', 'col-12', 'justify-content-between', 'align-items-start');
        node.innerHTML = `
            <div class="order-info col-6 text-left">
              <p><i class="fa fa-user"></i> ${item.name}</p>
              <p><i class="fa fa-at"></i> ${item.email}</p>
              <p><span class="fa fa-mobile"></span> ${item.phone}</p>
              <p><i class="fa fa-money-bill-alt"></i> ${item.price} $</p>
            </div>
        `;
        node.appendChild(this.renderOrderListToPosition(item.order));
        return node;
    }

    /**
     * Render Order list to position in order history window
     * @param data:Array of Objects
     * @returns {HTMLDivElement}
     */
    renderOrderListToPosition = (data) =>{
        const node = document.createElement('div');
        node.classList.add('order-list', 'col-6');
        data.forEach((elem, index) =>{
            const temp = document.createElement('p');
            temp.innerHTML = `<p><i class="fa fa-paw"></i> ${elem.pos.species}, ${elem.pos.breed} (x${elem.counter})</p>`;
            node.appendChild(temp);
        });
        return node;
    }

    /**
     * OpenEvent
     * @param data:[{name:string,email:string,phone:string,order:[],price:double}]
     */
    open = (data) =>{
        this.render(data);
        $(this.modalWindow).modal('show');
    }

    close = () =>{
        this.modalBody.innerHTML = '';
    }

    /**
     * Update counter in order history icon
     * @param num:number
     */
    updateCounter = (num) =>{
        this.historyCounter.innerHTML = num;
    }
}