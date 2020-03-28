const { Op } = require('sequelize');
const animalModel = require('./animal.model');
const { NotFound } = require('../../common/exceptions/');

class AnimalService {

    async selectAll(){
        return animalModel.findAll();
    }

    async getPage(offset, limit){
        return animalModel.findAll({offset: offset, limit: limit});
    }

    async getOneById(id){
        const animal = await animalModel.findOne({where: { id }});

        if(!animal){
            throw new NotFound('Animal not found.');
        }

        return animal;
    }

}

const animalService = new AnimalService();
module.exports = animalService;