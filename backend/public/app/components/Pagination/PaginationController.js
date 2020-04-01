import { PaginationView } from "./PaginationView.js";

export class PaginationController {
  constructor({notify, subscribe}) {
    this.view = new PaginationView(this.handlePagination);

    this.subscribe = subscribe;
    this.notify = notify;

    //Event filters load
    this.subscribe('getFilters', this.showPagination);
  }

  /**
   * Called during pagination, notifies all subscribers of the 'pagination' event
   * @param ev
   */
  handlePagination = (ev) => {
    this.notify('pagination', ev.target.dataset.id);
  }

  /**
   * Show pagination after load data and filters. FOR PRELOADER!!!
   */
  showPagination = () =>{
    this.view.show();
  }
}