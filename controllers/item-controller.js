const itemService = require('../services/item-service')

const itemController = {
  postItem: (req, res, next) => {
    const { name, place, findDate } = req.body
    if (!name || !place || !findDate) throw new Error('請填寫必要資訊')
    itemService.postItem(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }
}
module.exports = itemController