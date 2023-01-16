const customError = require('../error/custom-error');

const errorHandler = (err, req, res, next) => {
    if (err instanceof customError) {
        return res.status(err.statusCode).json({msg: err.message});
    }

    return res.status(500).json({msg: err.message});
}

module.exports = errorHandler;
