'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Provider.hasMany(models.PhoneNumber, {
        foreignKey: 'provider_id',
        as: 'phone_numbers'
      });
    }
  }
  Provider.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Provider',
    tableName: 'provider'
  });
  return Provider;
};