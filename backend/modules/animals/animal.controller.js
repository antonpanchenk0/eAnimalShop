const { Op } = require('sequelize');
const animalService = require('./animal.service');

class AnimalController {

    async selectAll(req, res, next){
        try{
            const {species, breed} = req.query;
            if(!species && !breed) {
                //Select * From Animals where quantity Not equal 0
                const animals = await animalService.selectAll({where: { quantity: {[Op.ne]: 0} } });
                res.json(animals);
            }
            if(species){
                const filterAnimals = await animalService.selectAll({ where:{species: species} });
                res.json(filterAnimals);
            }
        } catch (e) {
            next(e);
        }
    }

    async getOneById(req, res, next){
        try{
            const animal = await animalService.getOneById(req.params.id);
            res.json(animal);
        } catch (e) {
            next(e);
        }
    }
}

const animalController = new AnimalController();
module.exports = animalController;