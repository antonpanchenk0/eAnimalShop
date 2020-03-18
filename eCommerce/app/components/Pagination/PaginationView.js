export class PaginationView {
  constructor(listener) {
    this.paginationBtns = document.querySelectorAll('.my-pagination');
    this.paginationBtns.forEach(btn => btn.addEventListener('click', listener));
  }
}