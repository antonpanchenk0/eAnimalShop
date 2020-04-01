import {AnnotationPopUpView} from "./AnnotationPopUpView.js";

export class AnnotationPopUpController {
    constructor({subscribe}){
        this.view = new AnnotationPopUpView();
        this.subscribe = subscribe;

        this.subscribe('popup', this.popup);
    }

    /**
     * Show PopUp in DOM
     * @param data:String
     */
    popup = (data) =>{
        this.view.render(data);
    }
}