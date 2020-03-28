const animalService = require('../animals/animal.service');

const limit = 8; //count of cards in one page

class PagesController {

    async getPage(req, res, next){
        try{
            const offset = limit * (req.params.id - 1);
            const sortBy = req.query.sort;
            if(!sortBy) {

                const pageData = await animalService.getPage(offset, limit);

                res.json(pageData);
            }
            if(sortBy){
                switch (sortBy) {
                    case 'priceDown':{
                        const pageSortData = await animalService.getPageSortByPriceDown(offset, limit);
                        res.json(pageSortData);
                        break;
                    }
                    case 'priceUp':{
                        const pageSortData = await animalService.getPageSortByPriceUp(offset, limit);
                        res.json(pageSortData);
                        break;
                    }
                    case 'ageDown':{
                        const pageSortData = await animalService.getPageSortByAgeDown(offset, limit);
                        res.json(pageSortData);
                        break;
                    }
                    case 'ageUp':{
                        const pageSortData = await animalService.getPageSortByAgeUp(offset, limit);
                        res.json(pageSortData);
                        break;
                    }
                    default:{
                        //Error mb?
                        res.sendStatus(404);
                        break;
                    }
                }
            }
        }catch(e){
            next(e);
        }
    }

}

const pagesController = new PagesController();
module.exports = pagesController;