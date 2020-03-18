import { FilterView } from "./FilterView.js";

export class FilterController {
  constructor({notify, subscribe, unsubscribe}) {
    this.view = new FilterView(this.updateFiltersValueForRerender);
    this.subscribe = subscribe;
    this.notify = notify;
    this.unsubscribe = unsubscribe;

    this.subscribe('getFilters', this.renderFilterBtn);
  }

  //Функция вызова рендера фильров и дальнейшая отписка от события
  renderFilterBtn = (data) => {
    this.view.renderFilters(data);
    this.unsubscribe('getFilters', this.renderFilterBtn);
  }

  //Функция при езменнение значений фильтров, вызывает search и выполняет колбеки подписчиков
  updateFiltersValueForRerender = () => {
    this.notify('search', {inputSearch: this.view.dataInputValue, activeBtn: this.view.activeFilterName});
  }
}