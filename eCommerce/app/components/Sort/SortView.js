export class SortView {
  constructor(listener) {
    this.sortItems = document.querySelectorAll('.sort-by');
    this.sortItems.forEach(btn => btn.addEventListener('click', listener));
  }
}