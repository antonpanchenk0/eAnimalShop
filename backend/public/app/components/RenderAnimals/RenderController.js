import { RenderView } from './RenderView.js';
import { RenderModel } from './RenderModel.js';

export class RenderController {
  constructor({subscribe, notify}) {
    this.view = new RenderView(this.handleDetails, this.handleAddToCart);
    this.model = new RenderModel();
    this.subscribe = subscribe;
    this.notify = notify;

    this.subscribe('search', this.renderFilterAnimals);
    this.subscribe('sort', this.renderSortAnimals);
    this.subscribe('pagination', this.handlePagination);
    this.subscribe('refreshData', this.refreshDataAfterCreateOrder);

    this.renderAnimals().then(()=>this.renderFilters()).then(()=> this.deletePreloader());
  }

  /**
  * function of transferring the received data from the model to the view for a minor render
  * @returns {Promise<void>}
  */
  async renderAnimals(){
    await this.model.getData().then(() => this.view.renderData(this.model.getPaginationData(this.model.currentDataState)));
    this.notify('transferData', this.model.data);
  }

  /**
  * function of transmitting data about the received filters in FilterController for a lower render
  */
  renderFilters = () =>{
    this.model.getFilters().then(data=>this.notify('getFilters', data));
  }

  /**
  * function of data renderer, depending on the installed filters, accepts an object that stores filter values
  * fObj{inputSearch, activeBtn}
  * @param fObj:{string, string}
  */
  renderFilterAnimals = (fObj) =>{
    const data = this.model.filterData(fObj);
    this.view.renderData(this.model.getPaginationData(data));
    this.view.renderPageNum();
  }

  /**
  * current render data sort function
  * @param sort:string
  */
  renderSortAnimals = (sort) => {
    this.view.renderData(this.model.sortData(sort));
    this.view.renderPageNum();
  }

  /**
  * pagination function. Switch data on page
  * @param where:string
  */
  handlePagination = (where = 'next') => {
    this.view.renderData(this.model.getPaginationData(where));
    this.view.renderPageNum(this.model.paginationPage);
  }

  /**
  * off preloader function
  */
  deletePreloader = () =>{
    this.view.offPreloader();
  }

  /**
  * details btn function. Show modal window with details
  * @param id:number
  */
  handleDetails = (id) =>{
    const animal = this.model.getSingleAnimal(id);
    this.notify('show-details-event', animal);
  }

  /**
  * addToCart btn function. Add animal to cart data array
  * @param id:number
  */
  handleAddToCart = (id) =>{
    const animal = this.model.getSingleAnimal(id);
    this.notify('addToCart', animal);
  }

  /**
  * update Data function. Update after success create new order
  */
  refreshDataAfterCreateOrder = () =>{
    this.renderAnimals().then(()=>this.renderFilters());
  }

}