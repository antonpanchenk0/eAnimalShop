export class PaginationView {
  constructor(listener) {
    this.paginationBox = document.querySelector('nav.animal-pagination');
    this.paginationBtns = document.querySelectorAll('.my-pagination');
    this.paginationBtns.forEach(btn => btn.addEventListener('click', listener));
  }

  /**
   * show pagination FOR PRELOADER!!!
   */
  show(){
    this.paginationBox.classList.add('show');
  }
}