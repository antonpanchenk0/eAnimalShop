export class RenderModel {
  constructor() {
    this.dataLink = 'https://antonpanchenk0.github.io/eAnimalShop/eCommerce/app/data/data.json';
    this.data = [];
    this.currentDataState = [];
    this.filters = new Set();
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
    
    return this.currentDataState;
  }
}