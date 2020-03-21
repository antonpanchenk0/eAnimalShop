import {DetailsButtonView} from "./DetailsButtonView.js";

export class DetailsButtonController{
    constructor({notify, subscribe}){
        this.view = new DetailsButtonView(this.closeModal);

        this.subscribe = subscribe;

        this.subscribe('show-details-event', this.showModal);
    }

    showModal = (data) =>{
        this.view.show(data);
    }

    closeModal = () =>{
        this.view.close();
    }
}