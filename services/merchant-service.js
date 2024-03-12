const { Merchant, User, Item } = require('../models')
const fileHelper = require('../helpers/file-helper')

const merchantService = {
  postMerchant: async (req, cb) => {
    try {
      const possessionMerchant = await Merchant.count({ where: { userId: req.user.id } })
      if (possessionMerchant >= 5) throw new Error('持有商家已達上限(5個)')
      const { name, address, phone } = req.body
      const logo = req.file ? await fileHelper.fileToJpegUser(req.file) : null
      const newMerchant = await Merchant.create({
        name,
        logo,
        address,
        phone,
        userId: req.user.id
      })
      return cb(null, newMerchant)
    }
    catch (err) {
      console.log(err)
      return cb(err)
    }
  },
  getMerchant: (req, cb) => {
    return Merchant.findByPk(req.params.id, {
      include: [
        { model: Item },
        { model: User }]
    },
      { raw: true })
      .then(merchant => {
        if (!merchant) throw new Error('找不到此商家')
        return cb(null, merchant)
      })
      .catch(err => cb(err))
  },
  putMerchant: async (req, cb) => {
    try {
      const merchant = await Merchant.findByPk(req.params.id)
      if (!merchant) throw new Error('找不到此商家')
      if (merchant.userId !== req.user.id) throw new Error('僅能修改自己的商家')
      const logo = req.file ? await fileHelper.fileToJpegUser(req.file) : null
      await merchant.update({
        name: req.body.name || merchant.name,
        logo: logo || merchant.logo,
        address: req.body.address || merchant.address,
        phone: req.body.phone || merchant.phone
      })
      await merchant.save()
      return cb(null, merchant)
    } catch (err) {
      console.log(err)
      return cb(err)
    }
  },
  getMerchants: (req, cb) => {
    return Merchant.findAll({ raw: true })
      .then(merchants => {
        if (!merchants) return cb(null, '尚未有商家資訊')
        else return cb(null, merchants)
      })
      .catch(err => cb(err))
  },
  deleteMerchant: (req, cb) => {
    return Merchant.findByPk(req.params.id)
      .then(merchant => {
        if (!merchant) throw new Error('找不到此商家')
        console.log(merchant.userId)
        if (merchant.userId !== req.user.id) throw new Error('無法刪除他人商家')
        return merchant.destroy()
      })
      .then(deletedMerchant => cb(null, deletedMerchant))
      .catch(err => cb(err))
  }
}

module.exports = merchantService