import { RenderView } from './RenderView.js';
import { RenderModel } from './RenderModel.js';

export class RenderController {
  constructor() {
    this.view = new RenderView(this.renderAnimals);
    this.model = new RenderModel();
  }

  renderAnimals = () => {
    this.model.getData().then(arr => this.view.renderData(arr));
  }
}