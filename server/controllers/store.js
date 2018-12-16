const db = require('../models');
const { Store } = db;

const createStore = (req, res) => {
  Store.create(req.body)
  .then(store => {
    res.send('Store created')
  })
  .catch(err=> {
    res.send(err)
  })
}

const getStores = (req, res) => {
  Store.findAll()
  .then(store => {
    res.send(store)
  })
  .catch(err => {
    res.send(err)
  })
}

const buyProduct = (req, res) => {
  Store.find({
    id: req.params.id
  })
  .then(store => {
    const currentProducts = store.products || [];
    if (currentProducts.length > 0) {
      const errors = [];
      for (let i = 0; i < currentProducts.length; i++) {
        if (currentProducts[i].quantity === 0) {
          errors.push(`${currentProducts[i].name} out of stock`);
        }
      }
      if (errors.length > 0) {
        res.send(errors);
      }
    }
    const newProducts = [ ...currentProducts, req.body.products];
  })
  Store.update({
    products: newProducts
  })
  .then(res => {
    res.send('Success')
  })
  .catch(err => {
    res.send(err);
  })
}

const stockProduct = (req, res) => {
  const storeId = req.params.id;
  let newProducts = [];
  Store.findOne({}, {
    where: {
      id: storeId
    }
  })
  .then(store => {
    const currentProducts = store.dataValues.products || [];
    const payload = req.body.products;

    const tmp = {};
    const convertedProducts = [];
    for (let i = 0; i < payload.length; i++) {
      if (!tmp[payload[i].barcode]) {
        tmp[payload[i].barcode] = {};
        tmp[payload[i].barcode].quantity = 1;
        tmp[payload[i].barcode].details = payload[i];
      } else {
        tmp[payload[i].barcode].quantity += 1;
      }
    }
    const registeredProducts = Object.keys(tmp);
    for (let j = 0; j < registeredProducts.length; j++) {
      const added = '';
      for (let x = 0; x < currentProducts.length; x++) {
        if (currentProducts[x].barcode === registeredProducts[j]) {
          currentProducts[x].quantity += tmp[registeredProducts[j]].quantity;
          added = true;
        }
      }
      if (!added) {
        currentProducts.push(JSON.stringify({
          barcode: registeredProducts[j],
          quantity: tmp[registeredProducts[j]].quantity,
          details: tmp[registeredProducts[j]].details,
        }))
      }

    }
    Store.update({
      products: currentProducts,
    }, {
      where: {
        id: storeId
      }
    })
    .then(response => {
      Store.findOne({}, {
        where: {
          id: storeId
        }
      })
      .then(newStore => {
        res.send(newStore);
      })
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  })
}


module.exports = {
  createStore,
  getStores,
  buyProduct,
  stockProduct,
}
