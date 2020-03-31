const createOrderDto = require('./orders.dtos');
const { Router } = require('express');
const ordersController = require('./orders.controller');
const createValidator = require('../../common/middlewares/create-validator');

const router = new Router();

router.get('/', ordersController.findMany);
router.get('/history', ordersController.getHistory);
router.get('/:id', ordersController.findOne);

router.post('/', createValidator(createOrderDto), ordersController.createOne);

module.exports = router;