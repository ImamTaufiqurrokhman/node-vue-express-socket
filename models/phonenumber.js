'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhoneNumber.belongsTo(models.Provider, {
        foreignKey: 'provider_id',
        as: 'provider'
      });
    }
  }
  PhoneNumber.init({
    number: DataTypes.DOUBLE,
    provider_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PhoneNumber',
    tableName: 'phone_number'
  });
  return PhoneNumber;
};