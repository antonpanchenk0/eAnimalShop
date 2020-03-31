const orderService = require('./orders.service');
const { BadRequest } = require('../../common/exceptions/');

class OrderController{

    async createOne(req, res, next){
        try{
            const order = await orderService.createOne(req.body);
            const orderFullData = await orderService.findOne(order.id);
            const msg = await orderService.sendMessageToTelegram(orderFullData);
            res.sendStatus(200);
        }catch(e){
            console.log(e)
            next(e);
        }
    }

    async findMany(req, res, next){
        try{
            const orders = await orderService.findMany();
            res.send(orders);
        }catch (e){
            next(e);
        }
    }

    async findOne(req, res, next){
        try{
            const order = await orderService.findOne(req.params.id);
            res.send(order);
        }catch (e) {
            next(e);
        }
    }

}

const orderController = new OrderController();

module.exports = orderController;