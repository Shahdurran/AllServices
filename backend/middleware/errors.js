const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success : false,
            error : err,
            errorMessage : err.message,
            stack : err.stack
        })
    }
    if(process.env.NODE_ENV === "PRODUCTION"){

        let error = {...err}

        error.message = err.message;

        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`
            err = new ErrorHandler(message, 400)
        }

        // Handle Mongoose Validation error
        if(err.name === 'ValidatorError'){
            const message = Object.values(err.errors).map( value => value.message)
            error = new ErrorHandler(message, 400)
        }
        // Syantak Error
        if (err instanceof SyntaxError) {
            // Output expected SyntaxErrors.
            const message = Object.values(err.errors).map( value => value.message)
            error = new ErrorHandler(message, 400)
        }

        res.status(err.statusCode).json({
            success : false,
            message : err.message || 'internal Server error'
        })
    }

}