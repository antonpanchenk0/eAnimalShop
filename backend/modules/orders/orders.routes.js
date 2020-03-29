const { Router } = require('express');
const ordersController = require('./orders.controller');

const router = new Router();

router.post('/', ordersController.createOne);

module.exports = router;