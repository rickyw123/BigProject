const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(conn => {
        console.log(`DB Connection : ${conn.connection.host}`);
    })
}

module.exports = connectDB;

// jwt_secret Kalau kita mau generate jsonwebtoken, dia suruh kita masukin password JWT nya.

// db.js buat connect ke database, functionnya import ke server.js