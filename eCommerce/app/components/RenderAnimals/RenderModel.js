export class RenderModel {
  constructor() {
    this.dataLink = 'https://antonpanchenk0.github.io/eAnimalShop/eCommerce/app/data/data.json';
  }

  getData() {
    return fetch(this.dataLink).then(res => res.json()).then(arr => {
      this.data = arr.map(obj => obj);
      return arr;
    });
  }
}