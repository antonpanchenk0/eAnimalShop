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

    this.renderAnimals().then(()=>this.renderFilters()).then(()=> this.deletePreloader());
  }

  //Функция передачи полученных данных из модели в представление для подальшего рендера
  async renderAnimals(){
    await this.model.getData().then(() => this.view.renderData(this.model.data));
  }

  //Функция передачи данных о полученных фильтрах в FilterController для подальшего рендера
  renderFilters = () =>{
    this.model.getFilters().then(data=>this.notify('getFilters', data));
  }

  //Функция перерендера данных в зависимости от установленных фильтров, принимает объект который хранит в себе значения фильтров
  renderFilterAnimals = (fObj) =>{
    const data = this.model.filterData(fObj);
    this.view.renderData(data);
  }

  //Функция сортировки данных, которые в данный момент отрендерены
  renderSortAnimals = (id) => {
    this.view.renderData(this.model.sortData(id));
  }

  deletePreloader = () =>{
      this.view.offPreloader();
  }

}