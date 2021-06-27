const router = require('express').Router();
const productControllers = require('./../controllers/productControllers');

router.get('/', productControllers.getAllProduct);
router.get('/:id', productControllers.getSpecificProduct);
router.post('/', productControllers.addProduct);

module.exports = router;