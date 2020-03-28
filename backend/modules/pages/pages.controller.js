const animalService = require('../animals/animal.service');

const limit = 8; //count of cards in one page


class PagesController {

    async getPage(req, res, next){
        try{
            const offset = limit * (req.params.id - 1);

            const pageData = await animalService.getPage(offset, limit);

            res.json(pageData);
        }catch(e){
            next(e);
        }
    }

}

const pagesController = new PagesController();
module.exports = pagesController;