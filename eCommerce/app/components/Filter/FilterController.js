import {FilterView} from "./FilterView.js";

export class FilterController{
    constructor(rFilterData){
        this.view = new FilterView(this.renderNewData);
        this.filterRender = rFilterData;
    }

    renderNewData = () =>{
        this.filterRender(this.view.dataInputValue);
    }
}