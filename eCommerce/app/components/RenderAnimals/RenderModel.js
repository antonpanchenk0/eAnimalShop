export class RenderModel {
  constructor() {
    this.dataLink = 'https://antonpanchenk0.github.io/eAnimalShop/eCommerce/app/data/data.json';
  }

  getData() {
    return fetch(this.dataLink).then(res => res.json()).then(arr => {
      return arr;
    });
  }

  //getting an arr of 4 animals from data arr
  getAnimalsForSinglePage = (arr, pageIndex) => {
    let arrIndex = (pageIndex - 1) * 4;

    return arr.slice(arrIndex, arrIndex + 4);
  }
}