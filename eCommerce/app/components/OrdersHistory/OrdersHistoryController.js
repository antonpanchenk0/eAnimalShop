import {OrdersHistoryView} from "./OrdersHistoryView.js";
import {OrdersHistoryModel} from "./OrdersHistoryModel.js";

export class OrdersHistoryController {
    constructor({subscribe}){
        this.view = new OrdersHistoryView(this.openHistory);
        this.model = new OrdersHistoryModel();

        this.subscribe = subscribe;

        this.subscribe('transferData', this.setData);
        this.subscribe('confirmOrder', this.updateHistory);
    }

    openHistory = () =>{
        this.model.update();
        this.view.open(this.model.historyList);
    }

    setData = (data) =>{
        this.model.setMainData(data);
        this.model.update();
    }

    updateHistory = () =>{
        this.model.update();
    }

}