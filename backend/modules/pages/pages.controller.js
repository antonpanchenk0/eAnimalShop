const {Op} = require('sequelize');
const animalService = require('../animals/animal.service');


const limit = 8; //count of cards in one page

class PagesController {

    async getPage(req, res, next){
        try{
            const offset = limit * (req.params.id - 1);
            const {sort, species, breed} = req.query;
            let query = {where:{}};
            query.offset = offset;
            query.limit = limit;
            if(sort){
                switch (sort) {
                    case 'priceDown':{
                        query.order = [['price', 'DESC']];
                        break;
                    }
                    case 'priceUp':{
                        query.order = [['price']];
                        break;
                    }
                    case 'ageDown':{
                        query.order = [['birth_date', 'DESC']];
                        break;
                    }
                    case 'ageUp':{
                        query.order = [['birth_date']];
                        break;
                    }
                    default:{
                        break;
                    }
                }
            }
            if(species){
                query.where.species = species;
            }
            if(breed){
                query.where.breed = {[Op.startsWith]: breed}
            }
            const page = await animalService.selectAll(query);
            res.json(page);
        }catch(e){
            next(e);
        }
    }

}

const pagesController = new PagesController();
module.exports = pagesController;