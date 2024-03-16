const itemService = require('../services/item-service')

const itemController = {
  postItem: (req, res, next) => {
    const { name, place, findDate } = req.body
    if (!name || !place || !findDate) throw new Error('請填寫必要資訊')
    itemService.postItem(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  putItem: (req, res, next) => {
    console.log(req.params.id)
    const { name, description, place, findDate, category, } = req.body
    if (!name && !description && !place && !findDate && !req.file && !category) throw new Error('未修改任何資訊')
    itemService.putItem(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  deleteItem: (req, res, next) => {
    itemService.deleteItem(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  getItem: (req, res, next) => {
    itemService.getItem(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  getItems: (req, res, next) => {
    itemService.getItems(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  claimItem: (req, res, next) => {
    itemService.claimItem(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }

}
module.exports = itemController