export class DetailsButtonView{
    constructor(closeListner){
        this.modalWindow = document.querySelector('div.details-modal');
        this.modalHeader = this.modalWindow.querySelector('.modal-header');
        this.modalBody = this.modalWindow.querySelector('.modal-body');


        $(this.modalWindow).on('hidden.bs.modal', closeListner);
    }

    show(data){
        $(this.modalWindow).modal('show');
    }

    close(){
        this.modalHeader.innerHTML = '';
        this.modalBody.innerHTML = '';
    }
}