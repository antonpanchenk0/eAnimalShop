import { RenderView } from './RenderView.js';
import { RenderModel } from './RenderModel.js';

export class RenderController {
  constructor({subscribe, notify}) {
    this.view = new RenderView();
    this.model = new RenderModel();
    this.subscribe = subscribe;
    this.notify = notify;

    this.subscribe('search', this.renderFilterAnimals);
    this.subscribe('sort', this.renderSortAnimals)

    this.renderAnimals().then(()=>this.renderFilters());
  }

  async renderAnimals(){
    await this.model.getData().then(() => this.view.renderData(this.model.data));
  }

  renderFilters = () =>{
    this.model.getFilters().then(data=>this.notify('getFilters', data));
    //Нужен ли после этого unsubscribe?
  }

  renderFilterAnimals = (fObj) =>{
    const data = this.model.filterData(fObj);
    this.view.renderData(data);
  }

  renderSortAnimals = (id) => {
    this.view.renderData(this.model.sortData(id));
  }

}