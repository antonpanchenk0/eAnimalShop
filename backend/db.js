const Sequelize = require('sequelize');
const { db } = require('./config');

const sequelize = new Sequelize(db.name, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect,
});

sequelize.authenticate().then(()=>console.log('DB connected complete.')).catch(err=>console.error('Error connection: ', err));

module.exports = sequelize;