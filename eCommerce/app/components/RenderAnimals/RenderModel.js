export class RenderModel {
  constructor() {
    this.dataLink = 'https://antonpanchenk0.github.io/eAnimalShop/eCommerce/app/data/data.json';
    this.data = [];
    this.dataForFilter = [];
    this.filters = new Set();
  }

  get fSpecies(){
    return this.filters;
  }

  getData() {
    return fetch(this.dataLink).then(res => res.json()).then(arr => {
      this.data = arr.map(obj => obj);
      return arr;
    });
  }

  async getFilters(){
    this.data.forEach(item=>this.filters.add(item.species));
    return this.filters;
  }

  filterData({inputSearch, activeBtn}){
    const regSearch_breed = new RegExp(inputSearch, 'i');
    const regSearch_species = new RegExp(activeBtn, 'i');
    this.dataForFilter = this.data.filter(({breed, species})=>regSearch_breed.test(breed) && regSearch_species.test(species));
    if(activeBtn == 'all'){
      this.dataForFilter = this.data.filter(({breed})=>regSearch_breed.test(breed));
    }
    return this.dataForFilter;
  }
}