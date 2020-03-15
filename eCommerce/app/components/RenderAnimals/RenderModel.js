export class RenderModel {
  constructor() {
    this.dataLink = '../../app/data/data.json'
  }

  getData() {
    return fetch(this.dataLink).then(res => res.json()).then(obj => {
      console.log(obj);
      return obj;
    });
  }
}