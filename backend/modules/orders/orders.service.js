const { Op } = require('sequelize');
const sequelize = require('../../db');
const OrderModel = require('./orders.model');
const OrderItemModel = require('./order-item.model');
const CustomerService = require('../customers/customers.service');
const AnimalService = require('../animals/animal.service');

class OrderService{

    async createOne(orderData){
        return sequelize.transaction(async transaction =>{
            const { items, customer, price } = orderData;

            //Вынести в animals
            const foundAnimals = await AnimalService.selectAll({
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

            items.forEach(animal =>{
                const foundAnimal = foundAnimals.find(a => a.id === animal.id);
                if(foundAnimal.quantity < animal.quantity){
                    throw new Error(`You cannot buy more animals tan it is available for id ${animal.id}`)
                }
            })

            const order = new OrderModel();
            order.orderPrice = price;
            const savedOrder = await order.save({transaction});
            customer.orderId = savedOrder.id;
            await CustomerService.createOne(customer, transaction);
            const orderItems = items.map(item => ( { orderId: savedOrder.id, animalId: item.id, quantity: item.counter} ));
            const saveOrderItems = await OrderItemModel.bulkCreate(orderItems, {transaction});
            await Promise.all(items.map(item => AnimalService.subtractQuantity(item.id, item.counter, transaction)));
            order.items = saveOrderItems;
            return order;
        });
    }

}

const orderService = new OrderService();
module.exports = orderService;