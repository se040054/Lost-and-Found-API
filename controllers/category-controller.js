const categoryService = require('../services/category-service')
const categoryController = {
  getCategories: (req, res, next) => {
    categoryService.getCategories(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  getCategory: (req, res, next) => {
    categoryService.getCategory(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  postCategory: (req, res, next) => {
    if (!req.body.name) throw new Error('請輸入分類名稱')
    categoryService.postCategory(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  putCategory: (req, res, next) => {
    if (!req.body.name) throw new Error('請輸入分類名稱')
    categoryService.putCategory(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  deleteCategory: (req, res, next) => {
    categoryService.deleteCategory(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }

}

module.exports = categoryController