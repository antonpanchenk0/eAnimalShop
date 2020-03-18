export class RenderModel {
  constructor() {
    this.dataLink = 'https://antonpanchenk0.github.io/eAnimalShop/eCommerce/app/data/data.json';
    this.data = [];
    this.currentDataState = [];
    this.filters = new Set(); // poprobovat' zamenit' na currentDataState v code

    this.paginationCount = 4; // number of animals be rendered on page
    this.paginationPage = 1; // number of page
  }

  get fSpecies(){
    return this.filters;
  }

  //Получение данных из базы (json)
  getData() {
    return fetch(this.dataLink).then(res => res.json()).then(arr => {
      this.data = arr.map(obj => obj);
      this.currentDataState = arr.map(obj => obj);
      return arr;
    });
  }

  //Вычисление всех видов животных, для создания фильтров
  async getFilters(){
    this.data.forEach(item=>this.filters.add(item.species));
    return this.filters;
  }

  //Фильтрация данных по Input и фыбранному фильтру
  filterData({inputSearch, activeBtn}){
    const regSearch_breed = new RegExp(inputSearch, 'i');
    const regSearch_species = new RegExp(activeBtn, 'i');
    this.currentDataState = this.data.filter(({breed, species})=>regSearch_breed.test(breed) && regSearch_species.test(species));
    if(activeBtn == 'all'){
      this.currentDataState = this.data.filter(({breed})=>regSearch_breed.test(breed));
    }
    return this.currentDataState;
  }

  //Сортировка данных
  sortData(id) {
    switch(id) {
      case 'PriceUp': {
        this.currentDataState.sort((a, b) => a.price - b.price);
        break;
      }
      case 'PriceDown': {
        this.currentDataState.sort((a, b) => b.price - a.price);
        break;
      }
      default: {
        this.currentDataState.sort();
      }
    }
    
    return this.getPaginationData(this.currentDataState);
  }

  // выбрать из текущего состояния данных this.paginationCount элементов, для того, чтобы их отрендерить 
  getPaginationData(where) {
    switch(where) {
      case 'next': {
        this.paginationPage = this.currentDataState.length / this.paginationCount > this.paginationPage?
          this.paginationPage + 1:
          1;
        break;
      }
      case 'prev': {
        this.paginationPage = this.paginationPage === 1? 
          Math.ceil(this.currentDataState.length / this.paginationCount): 
          this.paginationPage - 1;
        break;
      }
      default : {
        this.paginationPage = 1;
      }
    }
    const from = (this.paginationPage - 1) * this.paginationCount;
    const to = this.paginationPage * this.paginationCount;

    return this.currentDataState.slice(from, to);
  }
}