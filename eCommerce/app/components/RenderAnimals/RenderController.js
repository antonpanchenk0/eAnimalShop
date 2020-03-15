import { RenderView } from './RenderView.js';
import { RenderModel } from './RenderModel.js';

export class RenderController {
  constructor() {
    this.view = new RenderView(
      this.renderAnimals, 
      this.handleClickPaginationNext,
      this.handleClickPaginationPrev
    );
    this.model = new RenderModel();

    this.itemsCounter = 0;
  }

  renderAnimals = () => {
    this.model.getData().then(arr => {
      this.itemsCounter = arr.length;
      return this.model.getAnimalsForSinglePage(arr, this.view.getPageIndex());
    })
    .then(arr => this.view.renderData(arr));
  }

  handleClickPaginationNext = () => {
    const pageIndex = this.view.getPageIndex();

    if (this.itemsCounter > pageIndex * 4) {
      this.view.setPageIndex(this.view.getPageIndex() + 1);
      this.renderAnimals(this.view.getPageIndex());
    } else {
      this.view.setPageIndex(1);
      this.renderAnimals(this.view.getPageIndex());
    }
  }

  handleClickPaginationPrev = () => {
    const pageIndex = this.view.getPageIndex();

    if (pageIndex !== 1) {
      this.view.setPageIndex(this.view.getPageIndex() - 1);
      this.renderAnimals(this.view.getPageIndex());
    } else {
      this.view.setPageIndex(Math.ceil(this.itemsCounter / 4));
      this.renderAnimals(this.view.getPageIndex());
    }
  }
}