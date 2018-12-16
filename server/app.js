var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var cors = require('cors');

var index = require('./routes/index');
var products = require('./routes/products');
var store = require('./routes/store');

var app = express();

const sequelize = new Sequelize('postgres://ozczbvgi:ibUaxSBSxBHpwMAQFumllnSav4OQKqWf@pellefant.db.elephantsql.com:5432/ozczbvgi');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', index);
app.use('/products', products);
app.use('/store', store);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
