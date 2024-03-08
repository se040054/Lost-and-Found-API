'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Merchant.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Merchant.init({
    name: DataTypes.STRING,
    logo:DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Merchant',
    tableName: 'Merchants',
    underscored: true,
  });
  return Merchant;
};