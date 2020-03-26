export class OrdersHistoryModel {
    constructor(){
        this.mainData = [];
    }

    get historyList(){
        return this.history;
    }

    setMainData = (data) =>{
        this.mainData = data;
    }

    update = () =>{
        this.history = JSON.parse(localStorage.getItem('ordersHistory')) || [];
        console.log('update', this.history)
        let convertData = [];
        let tempOrderData = [];
        if(this.history.length){
            //НЕ УДАЛЯТЬ БЕЗ ЭТОГО НЕ РАБОТАЕТ!!!!
            for(let i = 0; i < this.history.length; i++){
                for(let j = 0; j < this.history[i].order.data.length; j++){
                    for(let k = 0; k < this.mainData.length; k++){
                        if(this.history[i].order.data[j].id === this.mainData[k].id){
                            tempOrderData.push({pos: this.mainData[k], counter: this.history[i].order.data[j].counter});
                        }
                    }
                }
                convertData.push({
                    name: this.history[i].name,
                    email: this.history[i].email,
                    phone: this.history[i].phone,
                    order: tempOrderData,
                    price: this.history[i].order.price
                });
                tempOrderData = [];
            }
        };
        this.history  = convertData;
    }

}
