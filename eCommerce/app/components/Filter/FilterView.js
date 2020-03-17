export class FilterView{
    constructor(handleUpdateDataByFilters){
        this.dataInput = document.querySelector('input.filter-search');
        this.dataInput.addEventListener('input', handleUpdateDataByFilters);
        this.activeFilter = null;
        this.filterCountainer = document.querySelector('div#filter');

        this.handleUpdateDataByFilters = handleUpdateDataByFilters;
    }

    get dataInputValue(){
        return this.dataInput.value;
    }

    renderFilters(data){
        this.renderSingleFilter('all', this.filterCountainer).classList.add('f-active');
        data.forEach(value=>this.renderSingleFilter(value, this.filterCountainer));
        this.activeFilter = document.querySelector('button.btn-filter');
    }

    renderSingleFilter(value, parent){
        const btn = document.createElement('button');
        btn.textContent = value;
        btn.classList.add('btn');
        btn.classList.add('btn-warning');
        btn.classList.add('btn-filter');
        btn.addEventListener('click', (e)=>{
            e.preventDefault();
            btn.classList.add('f-active');
            if(this.activeFilter){
                this.activeFilter.classList.remove('f-active');
            }
            this.activeFilter = e.target;
            this.handleUpdateDataByFilters();
        });
        parent.appendChild(btn);
        return btn;
    }
}