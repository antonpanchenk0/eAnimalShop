import {RenderController} from './components/RenderAnimals/RenderController.js';
import {FilterController} from "./components/Filter/FilterController.js";
import {SortController} from "./components/Sort/SortController.js";
import {PaginationController} from "./components/Pagination/PaginationController.js";
import {DetailsButtonController} from "./components/DetailsButton/DetailsButtonController.js";
import {CartController} from "./components/Cart/CartController.js";
import {OrderController} from "./components/Order/OrderController.js";
import {AnnotationPopUpController} from "./components/AnnotationPopUp/AnnotationPopUpController.js";
import {OrdersHistoryController} from "./components/OrdersHistory/OrdersHistoryController.js";
import {Publisher} from "./helpers/Publisher.js";



const publisher = new Publisher();
const rend = new RenderController(publisher.methods);
const filter = new FilterController(publisher.methods);
const sort = new SortController(publisher.methods);
const pagination = new PaginationController(publisher.methods);
const details = new DetailsButtonController(publisher.methods);
const cart = new CartController(publisher.methods);
const orders = new OrderController(publisher.methods);
const annotation = new AnnotationPopUpController(publisher.methods);
const history = new OrdersHistoryController(publisher.methods);