export class FilterView{
    constructor(handleUpdateDataByFilters){
        this.dataInput = document.querySelector('input.filter-search');
        this.dataInput.addEventListener('input', handleUpdateDataByFilters);
        this.activeFilter = {};
        this.filterParentBlock = document.querySelector('.filter'); //parent block of filters structure
        this.filterCountainer = document.querySelector('div#filter'); //block where insert filters nodes

        this.handleUpdateDataByFilters = handleUpdateDataByFilters;
    }

    //return InputSearch
    get dataInputValue(){
        return this.dataInput.value;
    }

    //return current filter name
    get activeFilterName(){
        return this.activeFilter.name;
    }

    //filter render to DOM
    renderFilters(data){
        this.renderSingleFilter('all', this.filterCountainer).classList.add('f-active');
        data.forEach(value=>this.renderSingleFilter(value, this.filterCountainer));
        this.activeFilter.node = document.querySelector('button.btn-filter');
        this.activeFilter.value = 'all';
        this.filterParentBlock.classList.add('f-render');
    }

    //Create Node to one filter
    renderSingleFilter(value, parent){
        const btn = document.createElement('button');
        btn.textContent = this.convertToMany(value);
        btn.classList.add('btn', 'btn-warning', 'btn-filter', 'col-4', 'col-sm-3', 'col-lg-2', 'col-xl-1', 'btn-filter');
        btn.addEventListener('click', (e) => this.handleFilterClick(e,value));
        parent.appendChild(btn);
        return btn;
    }

    //Click event filter
    handleFilterClick = (e, value) =>{
        e.preventDefault();
        if(this.activeFilter && !e.target.classList.contains('f-active')){
            this.activeFilter.node.classList.remove('f-active');
        }
        e.target.classList.add('f-active');
        this.activeFilter.name = value;
        this.activeFilter.node = e.target;
        this.handleUpdateDataByFilters();
    }

    //Convert filter value to many
    convertToMany(value){
        const letters = ['a', 'i', 'o', 'u', 'ss', 's', 'x', 'z', 'ch', 'sh'];
        const wordLength = value.length;
        if(value == 'all') {
            return value;
        }
        if(letters.includes(value[wordLength - 1]) || letters.includes(value[wordLength - 2] + value[wordLength - 1])){
            value += 'es';
        } else{
            value += 's';
        }
        return value;
    }
}