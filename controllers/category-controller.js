const categoryService = require('../services/category-service')
const categoryController = {
  getCategories: (req, res, next) => {
    categoryService.getCategories(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }
}

module.exports = categoryController