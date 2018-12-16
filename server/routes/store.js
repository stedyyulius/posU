const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store');

/* GET users listing. */
router.get('/', storeController.getStores);

router.post('/', storeController.createStore);

router.put('/buyProduct/:id', storeController.buyProduct);

router.put('/stockProduct/:id', storeController.stockProduct);


module.exports = router;
