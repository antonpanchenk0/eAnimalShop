const sequelize = require('sequelize');
const animalModel = require('./animal.model');
const { NotFound } = require('../../common/exceptions/');

class AnimalService {

    async selectAll(){
        return animalModel.findAll();
    }

    async selectByFilterSpecie(species){
        return animalModel.findAll({ where:{species: species} })
    }

    async getPage(offset, limit){
        return animalModel.findAll({offset: offset, limit: limit});
    }

    async getPageSortByPriceDown(offset, limit){
        return animalModel.findAll({
            offset: offset,
            limit: limit,
            order: [['price', 'DESC']]
        })
    }

    async getPageSortByPriceUp(offset, limit){
        return animalModel.findAll({
            offset: offset,
            limit: limit,
            order: [['price']]
        })
    }

    async getPageSortByAgeDown(offset, limit){
        return animalModel.findAll({
            offset: offset,
            limit: limit,
            order: [['birth_date', 'DESC']]
        })
    }

    async getPageSortByAgeUp(offset, limit){
        return animalModel.findAll({
            offset: offset,
            limit: limit,
            order: [['birth_date']]
        })
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