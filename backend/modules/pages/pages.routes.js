const { Router } = require('express');
const pagesController = require('./pages.controller')

const router = new Router();

router.get('/:id', pagesController.getPage);

module.exports = router;