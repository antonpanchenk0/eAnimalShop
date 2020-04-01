import {OrdersHistoryView} from "./OrdersHistoryView.js";
import {OrdersHistoryModel} from "./OrdersHistoryModel.js";

export class OrdersHistoryController {
    constructor({subscribe}){
        this.view = new OrdersHistoryView(this.openHistory, this.closeHistory);
        this.model = new OrdersHistoryModel();

        this.subscribe = subscribe;

        this.subscribe('transferData', this.setData);
        this.subscribe('confirmOrder', this.updateHistory);
    }

    openHistory = () =>{
        this.model.update();
        this.view.open(this.model.historyList);
    }

    closeHistory = () =>{
        this.view.close();
    }

    /**
     *
     * @param data:Array of AnimalObjects
     */
    setData = (data) =>{
        this.model.setMainData(data);
        this.model.update();
        this.view.updateCounter(this.model.historyCount); //update history counter in nav icon
    }

    updateHistory = () =>{
        this.model.update();
        this.view.updateCounter(this.model.historyCount); //update history counter in nav icon
    }

}