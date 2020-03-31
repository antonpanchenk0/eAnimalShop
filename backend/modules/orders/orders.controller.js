const orderService = require('./orders.service');
const { BadRequest } = require('../../common/exceptions/');

class OrderController{

    async createOne(req, res, next){
        try{
            const order = await orderService.createOne(req.body);
            try {
                const orderFullData = await orderService.findOne(order.id);
                const msg = await orderService.sendMessageToTelegram(orderFullData);
            } catch (sendTelegramError) {
                console.log('Error send message to Telegram!\n', sendTelegramError);
            }
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

    async getHistory(req, res, next){
        try{
            const {email, phone} = req.query;
            console.log(req.query)
            if(!email && !phone){
                console.log('if1')
                throw new BadRequest(400, 'Cannot load history');
            }
            if(email){
                console.log('if2')
                let history = await orderService.getHistory({email: email});
                res.send(history);
            }
            if(phone){
                const history = await orderService.getHistory({phone: phone});
                res.send(history);
            }
        }catch (e) {
            console.log(":(")
            console.log(e)
            next(e);
        }
    }

}

const orderController = new OrderController();

module.exports = orderController;