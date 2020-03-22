export class CartModel{
    constructor(){
        this.cartItems = []; //arr of cart items
    }

    //Getter number of cart positions
    get cartCounter(){
        return this.cartItems.reduce((sum, current)=>{
            sum += current.counter;
            return sum;
        }, 0)
    }

    //Getter price of cart positions
    get priceCounter(){
        return this.cartItems.reduce((sum, current)=>{
            sum += current.data.price;
            return sum;
        }, 0)
    }

    //Getter data of cart
    get cartData(){
        return this.cartItems;
    }

    //Add new position to cart
    add(data){
        const cartLength = this.cartItems.length;
        for(let i = 0; i < cartLength; i++){
            if(this.cartItems[i].data === data){
                this.cartItems[i].counter++;
                return this.cartItems;
            }
        }
        this.cartItems.push({data: data, counter: 1});
    }

}