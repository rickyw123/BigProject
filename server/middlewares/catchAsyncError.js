module.exports = func => (req, res, next) =>
    Promise.resolve(func(req, res, next))
        .catch(next)

// misalnya ada asynchronous error, kemudian program bakalan masuk ke Promise.resolve untuk meresolve function yang ada di controller, tangkap errornya, kemudian jalanin statement "next"