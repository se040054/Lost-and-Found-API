const categoryService = require('../services/category-service')
const categoryController = {
  getCategories: (req, res, next) => {
    categoryService.getCategories(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  postCategories: (req, res, next) => {
    if (!req.body.name) throw new Error('請輸入分類名稱')
    categoryService.postCategories(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }
  
}

module.exports = categoryController