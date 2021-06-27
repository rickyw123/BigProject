const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            error: err,
            stack: err.stack,
            message: err.message,
            success: false
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err};
        error.message = err.message;

        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        if (err.name === 'ValidationError') {
            const message = Object.valueOf(err.errors).map(value => value.message); // Object.valueOf -> mengambil semua value dari sebuah objek / property
            error = new ErrorHandler(message, 400);
        }

        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid';
            error = new ErrorHandler(message, 400);
        }

        if (err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired';
            error = new ErrorHandler(message, 400);
        }

        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal server error' // || -> jika kondisi true, akan menampilkan error.message, jika false, akan menampilkan Internal server error
        });
    }
}