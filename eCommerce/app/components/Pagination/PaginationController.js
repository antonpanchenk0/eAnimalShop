import { PaginationView } from "./PaginationView.js";

export class PaginationController {
  constructor({notify}) {
    this.view = new PaginationView(this.handlePagination);
    this.notify = notify;
  }

  //Called during pagination, notifies all subscribers of the 'pagination' event
  handlePagination = (ev) => {
    this.notify('pagination', ev.target.dataset.id);
  }
}