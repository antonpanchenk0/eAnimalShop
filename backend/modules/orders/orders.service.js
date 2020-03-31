const { Op } = require('sequelize');
const { telegram } = require('../../config');
const { BadRequest } = require('../../common/exceptions');
const sequelize = require('../../db');
const OrderModel = require('./orders.model');
const CustomerModel = require('../customers/customers.model');
const OrderItemModel = require('./order-item.model');
const CustomerService = require('../customers/customers.service');
const AnimalService = require('../animals/animal.service');
const AnimalModel = require('../animals/animal.model');
const http = require('request');


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
                throw new BadRequest(400, `Invalid animals ids are [${invalidIds.join(',')}]`);
            }

            items.forEach(animal =>{
                const foundAnimal = foundAnimals.find(a => a.id === animal.id);
                if(foundAnimal.quantity < animal.quantity){
                    console.log(foundAnimal.quantity, animal.quantity)
                    throw new BadRequest(400, `You cannot buy more animals tan it is available for id ${animal.id}`)
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

    async findMany(){
        return OrderModel.findAll({
            include:[
                { model: CustomerModel, as: 'сustomer', attributes:['id', 'name', 'email','phone']},
                { model: OrderItemModel, as: 'items', include: [{model: AnimalModel, attributes: ['id','name','species','price','breed'], as: "animal"}], attributes:['quantity']}
            ],
            attributes:[
                'id',
                'orderPrice'
            ]
        });
    }

    async findOne(id){
        return OrderModel.findAll({
            where:{
              id: id
            },
            include:[
                { model: CustomerModel, as: 'сustomer', attributes:['id', 'name', 'email','phone']},
                { model: OrderItemModel, as: 'items', include: [{model: AnimalModel, attributes: ['id','name','species','price','breed'], as: 'animal'}], attributes:['quantity']}
            ],
            attributes:[
                'id',
                'orderPrice',
            ]
        });
    }

    async getHistory(query){
        return OrderModel.findAll({
            include:[
                { model: CustomerModel, as: 'сustomer', attributes:['id', 'name', 'email','phone'], where: query},
                { model: OrderItemModel, as: 'items', include: [{model: AnimalModel, attributes: ['id','name','species','price','breed'], as: "animal"}], attributes:['quantity']}
            ],
            attributes:[
                'id',
                'orderPrice'
            ]
        });
    }

    async sendMessageToTelegram(order){
        const { id, orderPrice, сustomer, items } = order[0];
        let msg = `*New order (${id})*\n*Order price: ${orderPrice}$*\n*Customer name: ${сustomer.name}*\n*Customer email: ${сustomer.email}*\n*Customer phone: ${сustomer.phone}*\n*Order:*\nid|name|species|price|breed|price by one|quantity\n`;
        let positions = items.map(item=>(`${item.animal.id} | ${item.animal.name} | ${item.animal.species} | ${item.animal.price} | ${item.animal.breed} | ${item.animal.price}$ | ${item.quantity}`))
        positions = positions.join('\n');
        msg+=positions;
        http.post(`https://api.telegram.org/bot${telegram.token}/sendMessage?chat_id=${telegram.chat}&parse_mode=markdown&text=${msg}`, (err, res, body) => {
            if(err){
                return err;
            }
        })
        return true;
    }


}

const orderService = new OrderService();
module.exports = orderService;