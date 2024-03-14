'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Item.belongsTo(models.User, { foreignKey: 'userId' })
      Item.belongsTo(models.Merchant, { foreignKey: 'merchantId' })
      Item.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'itemId',
        as: 'FavoritedUsers' // 收藏此物品的使用者們
      })
    }
  }
  Item.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    place: DataTypes.STRING,
    findDate: DataTypes.DATEONLY,
    photo: DataTypes.STRING,
    isClaimed: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    merchantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'Items',
    underscored: true,
  });
  return Item;
};