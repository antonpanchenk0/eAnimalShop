import { RenderView } from './RenderView.js';
import { RenderModel } from './RenderModel.js';

export class RenderController {
  constructor({subscribe, notify}) {
    this.view = new RenderView();
    this.model = new RenderModel();
    this.subscribe = subscribe;
    this.notify = notify;

    this.subscribe('search', this.renderFilterAnimals);
    this.subscribe('sort', this.renderSortAnimals);
    this.subscribe('pagination', this.handlePagination);

    this.renderAnimals().then(()=>this.renderFilters()).then(()=> this.deletePreloader());
  }

  //function of transferring the received data from the model to the view for a minor render
  async renderAnimals(){
    await this.model.getData().then(() => this.view.renderData(this.model.getPaginationData(this.model.currentDataState)));
  }

  //function of transmitting data about the received filters in FilterController for a lower render
  renderFilters = () =>{
    this.model.getFilters().then(data=>this.notify('getFilters', data));
  }

  //function of data renderer, depending on the installed filters, accepts an object that stores filter values
  renderFilterAnimals = (fObj) =>{
    const data = this.model.filterData(fObj);
    this.view.renderData(this.model.getPaginationData(data));
    this.view.renderPageNum();
  }

  //current render data sort function
  renderSortAnimals = (id) => {
    this.view.renderData(this.model.sortData(id));
    this.view.renderPageNum();
  }

  //pagination function. Switch data on page
  handlePagination = (where = 'next') => {
    this.view.renderData(this.model.getPaginationData(where));
    this.view.renderPageNum(this.model.paginationPage);
  }

  //off preloader function
  deletePreloader = () =>{
    this.view.offPreloader();
  }

}