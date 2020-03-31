const sequelize = require('sequelize');
const animalModel = require('./animal.model');
const { NotFound } = require('../../common/exceptions/');

class AnimalService {

    async selectAll(query){
        return animalModel.findAll(query);
    }

    async getOneById(id){
        const animal = await animalModel.findOne({where: { id }});

        if(!animal){
            throw new NotFound('Animal not found.');
        }

        return animal;
    }

    async subtractQuantity(animalId, quantity, transaction){
        const animal = await animalModel.findOne({ where:{id: animalId}, transaction });
        if(!animal){
            throw new NotFound(`Animal with id ${animalId} not found`);
        }
        if(animal.quantity < quantity){
            throw new Error(`You cannot buy more pets than it is available for id ${animal.id}`)
        }
        animal.quantity -= quantity;
        await animal.save({transaction});
    }

}

const animalService = new AnimalService();
module.exports = animalService;