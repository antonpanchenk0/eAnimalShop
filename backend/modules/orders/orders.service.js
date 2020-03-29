const { Op } = require('sequelize');
const sequelize = require('../../db');
const OrderModel = require('./orders.model');
const OrderItemModel = require('./order-item.model');
const CustomerModel = require('../customers/customers.model');
const AnimalModel = require('../animals/animal.model');

class OrderService{

    async createOne(orderData){
        return sequelize.transaction(async transaction =>{
            const items = orderData.items;
            const foundAnimals = await AnimalModel.findAll({
                where: { id: { [Op.in]: items.map(i => i.id) } },
                attributes: ['id', 'quantity'],
                transaction,
            });
            if(foundAnimals.length !== items.length){
                const invalidIds = [];
                items.forEach(item=>{
                    if(!foundAnimals.find(fa => fa.id === item.id)){
                        invalidIds.push(item);
                    }
                })
                throw new Error(`Invalid animals ids are [${invalidIds.join(',')}]`);
            }
            if(foundAnimals.length === items.length){
                const invalidIds = [];
                items.forEach(item=>{
                    if(foundAnimals.find(fa => fa.quantity < item.quantity)){
                        invalidIds.push(item);
                    }
                })
                if(invalidIds.length !== 0) {
                    throw new Error(`Invalid animals quantity, in animals with ids [${invalidIds.join(',')}]`);
                }
                const customer = await CustomerModel.create(orderData.customer, {transaction});
                console.log('LOoOOOOOOOOOOOOOGFSDALIJDSAUOKLGDLIUSAGFDUIO:ASGD:OUASGHPODGSAPUOIDGSAPOIUDGASPOUGDPIOUSAaspjodfio[ashdp[saodgpsapu',customer.id);
            };
            //check existence of pat and enough pet quantity
            //Order
            //order items
            //subtract amounts in pets
            //return order
            // await transaction.commit()
        });
    }

}

const orderService = new OrderService();
module.exports = orderService;