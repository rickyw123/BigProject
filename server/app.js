const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const error = require('./middlewares/error');
const fileUPload = require('express-fileupload');

dotenv.config({
  path: './config/.env'
});

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(fileUPload());

app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/product', require('./routes/product.route'));
app.use('/api/v1/transaction', require('./routes/transaction.route'));

app.use(error);

module.exports = app;