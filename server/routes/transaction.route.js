const router = require('express').Router();
const transactionControllers = require('./../controllers/transactionControllers');
const {isAuthenticated} = require('./../middlewares/auth');

router.post('/', transactionControllers.createTransaction);
router.get('/', isAuthenticated, transactionControllers.getAllTransactions);

module.exports = router;