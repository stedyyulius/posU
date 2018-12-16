'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    products: { type: DataTypes.ARRAY(DataTypes.TEXT) },
  }, {});
  Store.associate = function(models) {
    // associations can be defined here
  };
  return Store;
};
