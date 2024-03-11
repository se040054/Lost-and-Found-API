const { Category } = require('../models')
const categoryService = {
  getCategories: (req, cb) => {
    return Category.findAll({ raw: true })
      .then(categories => cb(null, categories))
      .catch(err => cb(err))
  },
  postCategories: (req, cb) => {
    return Category.findOne({ where: { name: req.body.name } })
      .then(repeatCategory => {
        if (repeatCategory) throw new Error('相同分類已存在')
        return Category.create({ name: req.body.name })
      })
      .then(newCategory => cb(null, newCategory))
      .catch(err => cb(err))
  }
}

module.exports = categoryService