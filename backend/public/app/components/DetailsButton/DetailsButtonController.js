import {DetailsButtonView} from "./DetailsButtonView.js";

export class DetailsButtonController{
    constructor({notify, subscribe}){
        this.view = new DetailsButtonView(this.closeModal, this.addToCart);

        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('show-details-event', this.showModal);
    }

    addToCart = (data) =>{
        this.notify('addToCart', data);
        this.closeModal();
    }

    showModal = (data) =>{
        this.view.show(data);
    }

    closeModal = () =>{
        this.view.close();
    }
}