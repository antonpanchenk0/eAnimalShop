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
        btn.textContent = this.convertToMany(value);
        btn.classList.add('btn');
        btn.classList.add('btn-warning');
        btn.classList.add('btn-filter');
        btn.classList.add('col-4');
        btn.classList.add('col-sm-3');
        btn.classList.add('col-lg-2');
        btn.classList.add('col-xl-1');
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