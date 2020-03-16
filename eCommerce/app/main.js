import { RenderController } from './components/RenderAnimals/RenderController.js';
import {FilterController} from "./components/Filter/FilterController.js";

const rend = new RenderController();
const filter = new FilterController(rend.renderFilterAnimals);