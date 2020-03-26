export class SortView {
  constructor(listener) {
    this.sortItems = document.querySelectorAll('.sort-by');
    this.sortShwitchBtn = document.querySelector('a.sort-switch-btn');
    this.sortItems.forEach(btn => btn.addEventListener('click', listener));
  }

  get switchBtn(){
    return this.sortShwitchBtn;
  }
}