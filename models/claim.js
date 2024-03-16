'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Claim.belongsTo(models.User,{foreignKey:'userId'})
      Claim.belongsTo(models.Item,{foreignKey:'itemId'})
    }
  }
  Claim.init({
    userId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Claim',
    tableName:'Claims',
    underscored: true,
  });
  return Claim;
};