const { Claim, Item } = require('../models')
const claimService = {
  postClaim: async (req, cb) => {
    const itemId = req.params.itemId
    const userId = req.user.id
    try {
      const item = await Item.findByPk(itemId)
      if (!item) throw new Error('找不到此物品')
      if (item.isClaimed) throw new Error('此物品已被認領')
      if (item.userId === userId) throw new Error('不能認領自己的物品，請使用刪除')
      const repeatClaim = await Claim.findOne({
        where: {
          itemId, userId
        }
      })
      if (repeatClaim) throw new Error('已申請過認領')
      const claim = await Claim.create({ itemId, userId, isApproved: null })
      cb(null, claim)
    } catch (err) {
      console.log(err)
      cb(err)
    }
  },
  getClaimSubmitted: async (req, cb) => {
    try {
      const userId = req.user.id
      const claims = await Claim.findAll({ where: { userId } })
      cb(null, claims)
    } catch (err) {
      console.log(err)
      cb(err)

    }
  }, getClaimReceived: async (req, cb) => {
    try {
      const userId = req.user.id
      const claims = await Claim.findAll({
        include: {
          model: Item,
          where: {
            userId
          }
        }
      })
      cb(null, claims)
    } catch (err) {
      console.log(err)
      cb(err)
    }
  }
}
module.exports = claimService