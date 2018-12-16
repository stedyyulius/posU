const db = require('../models');
const { Products } = db;


const getProducts = (req, res) => {
  Products.findAll()
  .then(products=> {
    res.send(products)
  })
  .catch(err => {
    res.send(err);
  })
}


const createProduct = (req, res) => {
  Products.create(req.body)
  .then(res => {
    console.log('Product created successfully');
    res.send(res)
  })
  .catch(err=> {
    res.send(err);
  })
}

module.exports = {
  getProducts,
  createProduct,
}
