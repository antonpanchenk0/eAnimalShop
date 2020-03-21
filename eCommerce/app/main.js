import {RenderController} from './components/RenderAnimals/RenderController.js';
import {FilterController} from "./components/Filter/FilterController.js";
import {SortController} from "./components/Sort/SortController.js";
import {PaginationController} from "./components/Pagination/PaginationController.js";
import {DetailsButtonController} from "./components/DetailsButton/DetailsButtonController.js";
import {Publisher} from "./helpers/Publisher.js";

const publisher = new Publisher();
const rend = new RenderController(publisher.methods);
const filter = new FilterController(publisher.methods);
const sort = new SortController(publisher.methods);
const pagination = new PaginationController(publisher.methods);
const details = new DetailsButtonController(publisher.methods);