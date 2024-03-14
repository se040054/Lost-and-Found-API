const { Favorite, User, Item } = require('../models')

const favoriteService = {
  postFavorite: async (req, cb) => {
    try {
      const item = await Item.findByPk(req.params.itemId)
      if (!item) throw new Error('此物品不存在')
      const repeat = await Favorite.findOne({
        where: {
          userId: req.user.id,
          itemId: req.params.itemId
        }
      })
      if (repeat) throw new Error('此物品已被收藏')
      const favorite = await Favorite.create({
        userId: req.user.id,
        itemId: req.params.itemId
      })
      return cb(null, favorite)
    } catch (err) {
      console.log(err)
      return cb(err)
    }
  }
}

module.exports = favoriteService