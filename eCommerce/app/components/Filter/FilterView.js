export class FilterView{
    constructor(handleUpdateDataByFilters){
        this.dataInput = document.querySelector('input.filter-search');
        this.dataInput.addEventListener('input', handleUpdateDataByFilters);
        this.activeFilter = {};
        this.filterCountainer = document.querySelector('div#filter');

        this.handleUpdateDataByFilters = handleUpdateDataByFilters;
    }

    get dataInputValue(){
        return this.dataInput.value;
    }

    renderFilters(data){
        this.renderSingleFilter('all', this.filterCountainer).classList.add('f-active');
        data.forEach(value=>this.renderSingleFilter(value, this.filterCountainer));
        this.activeFilter.node = document.querySelector('button.btn-filter');
        this.activeFilter.value = 'all';
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
                this.activeFilter.node.classList.remove('f-active');
            }
            this.activeFilter.name = value;
            this.activeFilter.node = e.target;
            this.handleUpdateDataByFilters();
        });
        parent.appendChild(btn);
        return btn;
    }
}