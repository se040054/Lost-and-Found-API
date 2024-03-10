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
      const photo = req.file ? await fileHelper.fileToJpegUser(req.file) : null
      const newItem = await Item.create({
        name: req.body.name,
        description: req.body.description || null,
        place: req.body.place,
        findDate: req.body.findDate,
        photo: photo || null,
        categoryId: req.body.category || null, // 選填欄位都會有null
        userId: req.user.id,
        merchantId: req.body.merchantId || null
      })
      return cb(null, newItem)
    } catch (err) {
      console.log(err)
      return cb(err)
    }
  },
  putItem: async (req, cb) => {
    try {
      const item = await Item.findByPk(req.params.id)
      if (!item) throw new Error('找不到此物品')
      if (item.toJSON().userId !== req.user.id) throw new Error('無法修改他人刊登的物品')
      const photo = req.file ? await fileHelper.fileToJpegItem(req.file) : null
      await item.update({
        name: req.body.name || item.name,
        description: req.body.description || item.description,
        place: req.body.place || item.place,
        findDate: req.body.findDate || item.findDate,
        photo: photo || item.photo,
        categoryId: req.body.category || item.categoryId // 注意這裡要轉換
      })
      await item.save()
      return cb(null, item)
    } catch (err) {
      console.log(err)
      cb(err)
    }

  }
}
module.exports = itemService