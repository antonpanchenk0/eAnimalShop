export class SortView {
  constructor(listener) {
    this.sortItems = document.querySelectorAll('.my-sort');
    this.sortItems.forEach(btn => btn.addEventListener('click', listener));
  }
}