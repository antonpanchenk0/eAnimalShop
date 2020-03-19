const { Router } = require('express');
const animalController = require('./animal.controller');

const router = new Router();

router.get('/', animalController.selectAll);
router.get('/:id', animalController.getOneById);

module.exports = router;