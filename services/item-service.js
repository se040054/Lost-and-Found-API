const { Op } = require('sequelize')
const { Item, User, Merchant, Comment, Claim, sequelize } = require('../models')
const fileHelper = require('../helpers/file-helper')

const itemService = {
  postItem: async (req, cb) => {
    try {
      if (req.query.merchant) {
        const merchant = await Merchant.findByPk(req.body.merchantId, { raw: true })
        if (!merchant) throw new Error('找不到此商家')
        if (merchant.userId !== req.user.id) throw new Error('此商家並非此登錄者所有')
      }
      const photo = req.file ? await fileHelper.fileToJpegItem(req.file) : null
      const newItem = await Item.create({
        name: req.body.name,
        description: req.body.description || null,
        place: req.body.place,
        findDate: req.body.findDate,
        photo: photo || null,
        categoryId: req.body.categoryId || null, // 選填欄位都會有null
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
      if (item.userId !== req.user.id) throw new Error('無法修改他人刊登的物品')
      const photo = req.file ? await fileHelper.fileToJpegItem(req.file) : null
      await item.update({
        name: req.body.name || item.name,
        description: req.body.description || item.description,
        place: req.body.place || item.place,
        findDate: req.body.findDate || item.findDate,
        photo: photo || item.photo,
        categoryId: req.body.categoryId || item.categoryId
      })
      await item.save()
      return cb(null, item)
    } catch (err) {
      console.log(err)
      cb(err)
    }
  },
  deleteItem: (req, cb) => {
    return Item.findByPk(req.params.id)
      .then(item => {
        if (!item) throw new Error('找不到此物品')
        if (item.userId !== req.user.id) throw new Error('無法刪除他人刊登的物品')
        return item.destroy()
      })
      .then(deleteItem => cb(null, deleteItem))
      .catch(err => cb(err))
  },
  getItem: (req, cb) => {
    return Item.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'avatar'] },
        { model: Merchant, attributes: ['id', 'name', 'logo'] },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['id', 'name', 'avatar']
          }
        }
      ],
      order: [
        [Comment, 'createdAt', 'DESC']
      ]
    })
      .then(item => {
        if (!item) throw new Error('找不到此物品')
        return cb(null, item)
      })
      .catch(err => cb(err))
  },
  getItems: async (req, cb) => {
    const category = req.query.category || null
    const search = req.query.search || null
    const ONE_PAGE_LIMIT = 12
    const amount = await Item.count({
      where: {
        isClaimed: false,
        ... (category ? { categoryId: category } : {}),
        ... (search ? {
          [Op.or]: [
            { name: { [Op.substring]: `${search}` } },
            { description: { [Op.substring]: `${search}` } },
            { place: { [Op.substring]: `${search}` } }
          ]
        } : {})
      }
    })
    const totalPage = Math.ceil(amount / ONE_PAGE_LIMIT)
    const current_page = Math.min(Math.max(req.query.page, 1), totalPage) || 1 //不超過最大值，不小於1，未輸入時預設1

    Item.findAll({
      where: {
        isClaimed: false,
        ... (category ? { categoryId: category } : {}),
        ... (search ? {
          [Op.or]: [
            { name: { [Op.substring]: `${search}` } },
            { description: { [Op.substring]: `${search}` } },
            { place: { [Op.substring]: `${search}` } }
          ]
        } : {})
      },
      attributes: {
        // 添加一行 評論數量的欄位
        include: [
          // 計算Comments的關聯item_id有幾個Comment 結果 
          [sequelize.literal('(SELECT COUNT(*) FROM Comments WHERE Comments.item_id = Item.id)'), 'commentAmount']
        ]
      },
      offset: ONE_PAGE_LIMIT * (current_page - 1),
      limit: ONE_PAGE_LIMIT,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatar']
        },
        {
          model: Merchant,
          attributes: ['id', 'name', 'logo']
        },
        {
          model: Comment,
          attributes: []
        }
      ]
    }, { raw: true })
      .then(items => cb(null, { items, current_page, totalPage }))
      .catch(err => cb(err))
  },
  adminDeleteItem: (req, cb) => {
    return Item.findByPk(req.params.id)
      .then(item => {
        if (!item) throw new Error('找不到此物品')
        return item.destroy()
      })
      .then(deleteItem => cb(null, deleteItem))
      .catch(err => cb(err))
  }
}
module.exports = itemService