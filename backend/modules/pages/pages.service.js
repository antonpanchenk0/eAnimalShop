const animalModel = require('../animals/animal.model');

class PagesService {

    async getPage(offset, limit){
        return animalModel.findAll({offset: offset, limit: limit});
    }

}

const pagesService = new PagesService();

module.exports = pagesService;