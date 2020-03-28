const { Op } = require('sequelize');
const animalModel = require('./animal.model');
const { NotFound } = require('../../common/exceptions/');

class TaskService {
    async selectAll(){
        return animalModel.findAll();
    }

    async selectRange(from, to){
        return animalModel.findAll( { where: { id: {[Op.between]: [from, to]} } });
    }

    async getOneById(id){
        const animal = await animalModel.findOne({where: { id }});

        if(!animal){
            throw new NotFound('Animal not found.');
        }

        return animal;
    }
}

const taskController = new TaskService();
module.exports = taskController;