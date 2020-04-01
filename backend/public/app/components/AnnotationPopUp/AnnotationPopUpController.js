//import {AnnotationPopUpView} from "./AnnotationPopUpView.js";
import notifyService from "./Notify.js";

export class AnnotationPopUpController {
    constructor({subscribe}){
        // this.view = new AnnotationPopUpView();
        this.notifyService = notifyService
        this.subscribe = subscribe;

        this.subscribe('popup', this.popup);
    }

    /**
     * Show PopUp in DOM
     * @param data:String
     */
    popup = (data) =>{
        this.notifyService.render(data);
    }
}