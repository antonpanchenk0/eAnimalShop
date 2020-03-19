const { Router } = require('express');
const animalController = require('./animal.controller');

const router = new Router();

router.get('/', animalController.selectAll);

module.exports = router;