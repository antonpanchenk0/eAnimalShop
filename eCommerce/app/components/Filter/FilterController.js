import { FilterView } from "./FilterView.js";

export class FilterController {
  constructor({notify, subscribe, unsubscribe}) {
    this.view = new FilterView(this.updateFiltersValueForRerender);
    this.subscribe = subscribe;
    this.notify = notify;
    this.unsubscribe = unsubscribe;

    this.subscribe('getFilters', this.renderFilterBtn);
  }

  //The function to call the render filter and further unsubscribe from the event
  renderFilterBtn = (data) => {
    this.view.renderFilters(data);
    this.unsubscribe('getFilters', this.renderFilterBtn);
  }

  //When changing filter values, the function calls search and executes the callbacks of subscribers
  updateFiltersValueForRerender = () => {
    this.notify('search', {inputSearch: this.view.dataInputValue, activeBtn: this.view.activeFilterName});
  }
}