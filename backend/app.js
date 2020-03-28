const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const errorHandler = require('./common/middlewares/error-handler')

const app = express();

app.use(bodyParser.json());


app.use('/', express.static('public'));
app.use('/animals', require('./modules/animals/animals.routes'));
app.use('/page', require('./modules/pages/pages.routes'));

app.use(errorHandler);

sequelize.sync();

app.listen(3003, ()=>console.log('Application started.'));