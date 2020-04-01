const CustomerModel = require('./customers.model');

class CustomersService{

    async createOne(customerData, transaction){
        const customer = await CustomerModel.create(customerData, { transaction });
        return customer;
    }

}

module.exports = new CustomersService();