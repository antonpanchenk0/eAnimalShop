export class CartModel {
  constructor() {
    this.data = [];
    this.currentCartDataState = JSON.parse(sessionStorage.getItem('cart')) || [];
  }

  //Getter number of cart positions
  get cartCounter() {
    return this.currentCartDataState.reduce((sum, current) => {
      sum += current.counter;
      return sum;
    }, 0)
  }

  //Getter price of cart positions
  get calcSum() {
    return this.currentCartDataState.reduce((sum, current) => {
      sum += current.data.price * current.counter;
      return sum;
    }, 0)
  }

  //Getter data of cart
  get cartData() {
    return this.currentCartDataState;
  }

  get shortCartData(){
    const temp = [];
    this.currentCartDataState.forEach(elem=>{
      temp.push({id: elem.data.id, counter: elem.counter});
    })
    return temp;
  }

  //Add new position to cart
  add(data) {
    const cartLength = this.currentCartDataState.length;
    for (let i = 0; i < cartLength; i++) {
      if (this.currentCartDataState[i].data.id === data.id) {
        this.currentCartDataState[i].counter++;
        return this.currentCartDataState;
      }
    }
    this.currentCartDataState.push({
      data: data,
      counter: 1
    });
  }

  removeCartData(){
    this.currentCartDataState = [];
  }

  //Increment position in cart
  incrementPos = (id) => {
    const cartLength = this.currentCartDataState.length;
    for (let i = 0; i < cartLength; i++) {
      if (this.currentCartDataState[i].data.id === id) {
        this.currentCartDataState[i].counter++;
        return this.currentCartDataState;
      }
    }
  }

  //Decrement position in cart
  decrementPos = (id) => {
    const cartLength = this.currentCartDataState.length;
    for (let i = 0; i < cartLength; i++) {
      if (this.currentCartDataState[i].data.id === id) {
        this.currentCartDataState[i].counter--;
        if (this.currentCartDataState[i].counter == 0) {
          return this.deletePos(id);
        }
        return this.currentCartDataState;
      }
    }
  }

  //Delete position in cart
  deletePos = (id) => {
    this.currentCartDataState = this.currentCartDataState.filter(item => item.data.id != id ? true : false);
  }

  //updating sessionStorage from current data
  updateSessionStorage = () => {
    const session = this.shortCartData;
    sessionStorage.setItem('cart', JSON.stringify(session));
  }

  //get main data from renderController
  catchData = (data) =>{
    this.data = data;
  }

  //updating data by session storage
  updateData = () =>{
    let tempData = [];
    if(this.currentCartDataState.length){
      this.data.map(item=>{
        for(let i = 0; i < this.currentCartDataState.length; i++){
          if(item.id === this.currentCartDataState[i].id){
            tempData.push({data:item, counter: this.currentCartDataState[i].counter});
          }
        }
      })
    };
    this.currentCartDataState  = tempData;
  }

}