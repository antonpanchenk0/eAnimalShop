export class RenderModel {
  constructor() {
    this.dataLink = 'http://localhost:3003/animals';
    this.data = []; //default data
    this.currentDataState = []; //currents state of data, after some filters sort or search
    this.filters = new Set(); // set of filters values

    this.paginationCount = 8; // number of animals be rendered on page
    this.paginationPage = 1; // number of page
  }

  //function get data from database
  getData() {
    return fetch(this.dataLink).then(res => res.json()).then(arr => {
      this.data = arr.map(obj => obj);
      this.currentDataState = arr.map(obj => obj);
      return arr;
    });
  }

  //function get information about one animal
  getSingleAnimal(id){
    return this.data.find(animal => animal.id == id);
  }

  //Species count for render filters
  async getFilters(){
    this.data.forEach(item=>this.filters.add(item.species));
    return this.filters;
  }

  //Filters data by input search and filter btn
  filterData({inputSearch, activeBtn}){
    const regSearch_breed = new RegExp(inputSearch, 'i');
    const regSearch_species = new RegExp(activeBtn, 'i');
    this.currentDataState = this.data.filter(({breed, species})=>regSearch_breed.test(breed) && regSearch_species.test(species));
    if(activeBtn == 'all'){
      this.currentDataState = this.data.filter(({breed})=>regSearch_breed.test(breed));
    }
    return this.currentDataState;
  }

  //Data sort
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
      case 'AgeUp': {
        this.currentDataState.sort((a, b) => a.birth_date - b.birth_date);
        break;
      }
      case 'AgeDown': {
        this.currentDataState.sort((a, b) => b.birth_date - a.birth_date);
        break;
      }
      default: {
        this.currentDataState.sort();
      }
    }
    
    return this.getPaginationData(this.currentDataState);
  }

  // Select from currentDataState, amount of elements eq this.paginationCount, for render it
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