const animalService = require('./animal.service');

class AnimalController {

    async selectAll(req, res, next){
        try{
            const animals = await animalService.selectAll();
            res.json(animals);
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