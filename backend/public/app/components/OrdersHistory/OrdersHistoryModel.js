export class OrdersHistoryModel {
    constructor(){
        this.mainData = [];
        this.history = [];
    }

    get historyList(){
        return this.history;
    }

    get historyCount(){
        return this.history.length;
    }

    /**
     * Set main data from renderModel
     * @param data
     */
    setMainData = (data) =>{
        this.mainData = data;
    }

    update = () =>{
        this.history = JSON.parse(localStorage.getItem('ordersHistory')) || [];
        let convertData = [];
        let tempOrderData = [];
        if(this.history.length){
            //НЕ УДАЛЯТЬ БЕЗ ЭТОГО НЕ РАБОТАЕТ!!!!
            for(let i = 0; i < this.history.length; i++){
                for(let j = 0; j < this.history[i].items.length; j++){
                    for(let k = 0; k < this.mainData.length; k++){
                        if(this.history[i].items[j].id === this.mainData[k].id){
                            tempOrderData.push({pos: this.mainData[k], counter: this.history[i].items[j].counter});
                        }
                    }
                }
                convertData.push({
                    name: this.history[i].customer.name,
                    email: this.history[i].customer.email,
                    phone: this.history[i].customer.phone,
                    order: tempOrderData,
                    price: this.history[i].price
                });
                tempOrderData = [];
            }
        };
        this.history  = convertData;
    }

}
