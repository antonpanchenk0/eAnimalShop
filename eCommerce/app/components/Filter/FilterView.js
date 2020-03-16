export class FilterView{
    constructor(handleRenderFilterData){
        this.dataInput = document.querySelector('input.filter-search');
        this.btns = document.querySelectorAll('button.btn-filter');
        this.dataInput.addEventListener('input', handleRenderFilterData);
    }

    get dataInputValue(){
        return this.dataInput.value;
    }
}