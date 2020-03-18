import { PaginationView } from "./PaginationView.js";

export class PaginationController {
  constructor({notify}) {
    this.view = new PaginationView(this.handlePagination);
    this.notify = notify;
  }

  //Вызывается при пагинации, оповещает всех подписчков события 'pagination'
  handlePagination = (ev) => {
    this.notify('pagination', ev.target.dataset.id);
  }
}