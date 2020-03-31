const orderService = require('./orders.service');
const { BadRequest } = require('../../common/exceptions/');

class OrderController{

    async createOne(req, res, next){
        try{
            const order = await orderService.createOne(req.body);
            console.log(order);
            res.sendStatus(200);
        }catch(e){
            console.log(e);
            next(e);
        }
    }

}

const orderController = new OrderController();

module.exports = orderController;