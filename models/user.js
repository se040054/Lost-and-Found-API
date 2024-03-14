'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Merchant, { foreignKey: 'userId' })
      User.hasMany(models.Item, { foreignKey: 'userId' })
      User.belongsToMany(models.Item, {
        through: models.Favorite,
        foreignKey: 'itemId',
        as: 'FavoritedItems' // 此使用者收藏的物品們
      })
    }
  }
  User.init({
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING, // 注意電話是字串 (非運算用途數字)
    county: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  });
  return User;
};