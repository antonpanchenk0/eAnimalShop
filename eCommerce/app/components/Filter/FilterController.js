import {FilterView} from "./FilterView.js";

export class FilterController{
    constructor({notify, subscribe}){
        this.view = new FilterView(this.updateFiltersValueForRerender);
        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('getFilters', this.renderFilterBtn)
    }

    renderFilterBtn = (data) =>{
        this.view.renderFilters(data);
    }

    updateFiltersValueForRerender = () =>{
        this.notify('search', {inputSearch: this.view.dataInputValue, activeBtn: this.view.activeFilter.name});
    }
}