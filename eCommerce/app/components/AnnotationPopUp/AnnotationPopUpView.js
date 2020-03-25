export class AnnotationPopUpView {
    constructor(){
        this.popUp = document.querySelector('.toast');
        this.annotationPopupBodyTitle = this.popUp.querySelector('.toast .toast-body .body-title');

        $(this.popUp).on('hidden.bs.toast', this.clear);//bootstrap4 toast close event
    }

    render = (data) =>{
        this.annotationPopupBodyTitle.innerHTML;
        $(this.popUp).toast('show'); //bootstrap4 toast show method
    }

    clear = () =>{
        this.annotationPopupBodyTitle.innerHTML = '';
    }

}