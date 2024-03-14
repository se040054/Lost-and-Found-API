const { Favorite, User, Item, Merchant } = require('../models')

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
  },
  deleteFavorite: async (req, cb) => {
    try {
      const item = await Item.findByPk(req.params.itemId)
      if (!item) throw new Error('找不到此物品')
      const favorite = await Favorite.findOne({
        where: {
          userId: req.user.id,
          itemId: req.params.itemId
        }
      })
      if (!favorite) throw new Error('尚未收藏此物品')
      const deletedFavorite = await favorite.destroy()
      return cb(null, deletedFavorite)
    } catch (err) {
      console.log(err)
      return cb(err)
    }
  },
  getMyFavorites: (req, cb) => {
    return User.findByPk(req.user.id, {
      include: {
        model: Item, as: 'FavoritedItems',
        through: {
          attributes: ['createdAt'], // 只取得Favorite表中的創立時間
        },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'avatar'] // 只返回刊登者的名稱與頭貼
          },
          {
            model: Merchant // 如果有就返回刊登商家
          }
        ],
      },
      order: [
        ['FavoritedItems', 'createdAt', 'DESC']  // !注意排序是放在user層，依據收藏時間由新到舊
      ]
    })
      .then(user => cb(null, user.FavoritedItems)) // 只取得返回物品 如果要連同user返回要消除密碼
      .catch(err => cb(err))
  }
}

module.exports = favoriteService