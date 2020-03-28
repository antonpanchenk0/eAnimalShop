const { Op } = require('sequelize');
const OrderModel = require('./orders.model');
const sequelize = require('../../db');
const AnimalModel = require('../animals/animal.model');

class OrderService{

    async createOne(orderData){
        return sequelize.transaction(async transaction =>{
            const items = orderData;
            const foundAnimals = await AnimalModel.findAll({
                where: { id: { [Op.in]: items.map(i => i.animalId) } },
                attributes: ['id', 'quantity'],
                transaction,
            });
            if(foundAnimals.length !== items.length){
                const invalidIds = [];
                items.forEach(item=>{
                    if(foundAnimals.find(fa => fa.id === id)){
                        invalidIds.push(item);
                    }
                })
                throw new Error(`Invalid animals ids are [${invalidIds.join(',')}]`);
            }
            //check existence of pat and enough pet quantity
            //Order
            //order items
            //subtract amounts in pets
            //return order
        });
    }

}