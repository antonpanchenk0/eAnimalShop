const animalModel = require('./animal.model');

class TaskService {
    async selectAll(){
        return animalModel.findAll();
    }
}

const taskController = new TaskService();
module.exports = taskController;