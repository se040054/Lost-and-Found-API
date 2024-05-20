const { Op } = require('sequelize')
const { Claim, Item, User, sequelize } = require('../models')
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
      if (repeatClaim?.isApproved === null) throw new Error('已申請過認領')
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
      const claims = await Claim.findAll({
        include: { model: Item },
        where: { userId }
        ,
        order: [['createdAt', 'DESC']]
      })
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
        include: [{
          model: Item,
          where: {
            userId
          }
        },
        { model: User }],
        order: [['createdAt', 'DESC']]
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
      // 下面是將修改認領的物品資料
      const claimedItem = await item.update({
        isClaimed: req.body.action
      }, { transaction: t })
      // 並且如果認領成功 將其他對此物品但非認領者的認領回絕
      // 注意action 是JSON ，會解析為字串而不是布林，這邊小心不要當成布林用
      if (req.body.action === 'true') {
        await Claim.update({
          isApproved: false
        }, {
          where: {
            // 將其他claim 同一物品，不同申請人的認領要求全部拒絕
            itemId: claim.itemId,
            userId: {
              [Op.not]: claim.userId
            }
          }
        }, { transaction: t })
      }
      // 下面是將修改認領資料
      // 此為修改作法， 原先作法將此行為放置第一，推測會導致所有Claim的更新與此衝突，將此操作順序放在後面則能成功執行
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
  },
  getClaim: async (req, cb) => {
    return Claim.findOne({
      where: {
        itemId: req.params.itemId,
        userId: req.user.id
      }
    }).then(claim => {
      return cb(null, claim)
      // 這邊目前不需要檢驗不存在，因為大部分物品為未申請認領狀態
    }).catch(err => cb(err))
  }
}
module.exports = claimService