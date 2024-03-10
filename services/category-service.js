const { Category } = require('../models')
const categoryService = {
  getCategories: (req, cb) => {
    return Category.findAll({ raw: true })
      .then(categories => {
        return cb(null, categories)
      })
      .catch(err => cb(err))
  }
}

module.exports = categoryService