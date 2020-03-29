const Exception = require('./exception');

class BadRequest extends Exception{
    constructor(error) {
        super(400, error);
    }
}

module.exports = BadRequest;