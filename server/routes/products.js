const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');


/* GET users listing. */
router.get('/', productController.getProducts);

router.post('/', productController.createProduct);

module.exports = router;
