export class AnnotationPopUpView {
    constructor(){
        this.popUp = document.querySelector('.toast');
        this.annotationPopupBodyTitle = this.popUp.querySelector('.toast .toast-body .body-title');

        $(this.popUp).on('hidden.bs.toast', this.clear);//bootstrap4 toast close event
    }

    /**
     * Show popUp
     * @param data:string
     */
    render = (data) =>{
        this.annotationPopupBodyTitle.innerHTML = data;
        this.popUp.parentElement.classList.remove('d-none');
        $(this.popUp).toast('show'); //bootstrap4 toast show method
    }

    clear = () =>{
        this.popUp.parentElement.classList.add('d-none');
        this.annotationPopupBodyTitle.innerHTML = '';
    }

}