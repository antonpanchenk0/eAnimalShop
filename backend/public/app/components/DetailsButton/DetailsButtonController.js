import {DetailsButtonView} from "./DetailsButtonView.js";

export class DetailsButtonController{
    constructor({notify, subscribe}){
        this.view = new DetailsButtonView(this.closeModal, this.addToCart);

        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('show-details-event', this.showModal);
    }

    /**
     * Add to cart Event
     * @param data:object of Animal
     */
    addToCart = (data) =>{
        this.notify('addToCart', data);
        this.closeModal();
    }

    /**
     * Show details window
     * @param data:object of Animal
     */
    showModal = (data) =>{
        this.view.show(data);
    }

    /**
     * Close detail window
     */
    closeModal = () =>{
        this.view.close();
    }
}