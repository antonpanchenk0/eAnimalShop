export class CartModel {
  constructor() {
    this.currentCartDataState = []; //arr of cart items
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

  //Add new position to cart
  add(data) {
    const cartLength = this.currentCartDataState.length;
    for (let i = 0; i < cartLength; i++) {
      if (this.currentCartDataState[i].data === data) {
        this.currentCartDataState[i].counter++;
        return this.currentCartDataState;
      }
    }
    this.currentCartDataState.push({
      data: data,
      counter: 1
    });
  }

  //Increment position in cart
  incrementPos = (data) => {
    const cartLength = this.currentCartDataState.length;
    for (let i = 0; i < cartLength; i++) {
      if (this.currentCartDataState[i].data === data) {
        this.currentCartDataState[i].counter++;
        return this.currentCartDataState;
      }
    }
  }

  //Decrement position in cart
  decrementPos = (data) => {
    const cartLength = this.currentCartDataState.length;
    for (let i = 0; i < cartLength; i++) {
      if (this.currentCartDataState[i].data === data) {
        if (this.currentCartDataState[i].counter == 0) {
          return this.currentCartDataState;
        }
        this.currentCartDataState[i].counter--;
        return this.currentCartDataState;
      }
    }
  }

  //Delete position in cart
  deletePos = (data) => {
    this.currentCartDataState = this.currentCartDataState.filter(item => item.data != data ? true : false);
  }

  //updating current data from sessionStorage
  load = (data) => {
    if (data) {
      this.currentCartDataState = data;
    }
  }

  //updating sessionStorage from current data
  updateSessionStorage = (data) => {
    sessionStorage.setItem('cart', JSON.stringify(data));
  }

}