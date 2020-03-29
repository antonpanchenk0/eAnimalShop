const orderService = require('./orders.service');
const { BadRequest } = require('../../common/exceptions/');

class OrderController{

    createOne(req, res, next){
        try{
            const orderData = req.body;
            const trans = orderService.createOne(orderData);
            res.sendStatus(200);
        }catch(e){
            next(e);
        }
    }

}

const orderController = new OrderController();

module.exports = orderController;