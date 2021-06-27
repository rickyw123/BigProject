const app = require('./app');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary');

process.on('uncaughtException', err => {
    console.log(`ERROR : ${err.message}`);
    console.log('Shutting down server due to uncaught exception!');
    process.exit(1);
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
connectDB();
const server = app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode.`));

process.on('unhandledRejection', err => {
    console.log(`ERROR : ${err.stack}`);
    console.log('Shutting down server due to unhandled rejection!');
    server.close(() => {
        process.exit(1);
    })
})

// server.js tempat kita jalanin server kita pake app.listen, trs konek database