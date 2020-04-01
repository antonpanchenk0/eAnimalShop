const Joi = require('joi');

const CreateOrderDto = Joi.object().keys({
    customer: Joi.object().keys({
        name: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).required(),
    }),
    items: Joi.array().items(Joi.object().keys({
        id: Joi.number().integer().min(1).required(),
        counter: Joi.number().integer().min(1).required(),
    })),
    price: Joi.number().min(1).required()
});

module.exports = CreateOrderDto;