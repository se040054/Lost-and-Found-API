const { Item, User, Merchant } = require('../models')
const fileHelper = require('../helpers/file-helper')

const itemService = {
  postItem: async (req, cb) => {
    try {
      if (req.query.merchant) {
        const merchant = await Merchant.findByPk(req.body.merchantId, { raw: true })
        if (!merchant) throw new Error('找不到此商家')
        if (merchant.userId !== req.user.id) throw new Error('此商家並非此登錄者所有')
      }
      const photo = req.file ? await fileHelper.fileToJpeg(req.file) : null
      const newItem = await Item.create({
        name: req.body.name,
        description: req.body.description || null,
        place: req.body.place,
        findDate: req.body.findDate,
        photo: photo || null,
        categoryId: req.body.category || null, // 選填欄位都會有null
        userId:req.user.id,
        merchantId:req.body.merchantId||null
      })
      return cb(null, newItem)
    } catch (error) {
      console.log(error)
      return cb(error)
    }

  }
}
module.exports = itemService