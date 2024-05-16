const { Claim, Item, sequelize } = require('../models')
const claimService = {
  postClaim: async (req, cb) => {
    const itemId = req.params.itemId
    const userId = req.user.id
    try {
      const item = await Item.findByPk(itemId)
      if (!item) throw new Error('找不到此物品')
      if (item.isClaimed) throw new Error('此物品已被認領')
      if (item.userId === userId) throw new Error('不能認領自己刊登的物品，請使用刪除')
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
  },
  getClaimReceived: async (req, cb) => {
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
  },
  putClaim: async (req, cb) => {
    const t = await sequelize.transaction()
    try {
      const claim = await Claim.findByPk(req.params.id)
      const item = await Item.findByPk(claim?.itemId) // 注意在改動順序下 這裡可能是null
      if (!claim) throw new Error('此認領要求不存在')
      if (item.userId !== req.user.id) throw new Error('無法批准別人的認領要求')
      if (claim.isApproved !== null) throw new Error('認領要求已被處理')
      if (!item) throw new Error('物品不存在')
      if (item.isClaimed) throw new Error('此物品已被認領')
      // 這邊的錯誤返回為了訊息的正確性( 應該先返回是否為刊登本人 才能查看認領情形 所以改動了錯誤順序 但可能浪費效能)
      const claimedItem = await item.update({
        isClaimed: req.body.action
      }, { transaction: t })
      const approvedClaim = await claim.update({
        isApproved: req.body.action
      }, { transaction: t })
      await t.commit()
      return cb(null, { claim: approvedClaim, item: claimedItem })
    } catch (err) {
      await t.rollback() // 在發生錯誤時取消交易
      console.log(err)
      cb(err)
    }
  }
}
module.exports = claimService