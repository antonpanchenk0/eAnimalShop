const Exception = require('./exception');

class NotFound extends Exception{
    constructor(error) {
        super(404, error);
    }
}

module.exports = NotFound;