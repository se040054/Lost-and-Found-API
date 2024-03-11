const { Category } = require('../models')
const categoryService = {
  getCategories: (req, cb) => {
    return Category.findAll({ raw: true })
      .then(categories => cb(null, categories))
      .catch(err => cb(err))
  },
  postCategory: (req, cb) => {
    return Category.findOne({ where: { name: req.body.name } })
      .then(repeatCategory => {
        if (repeatCategory) throw new Error('相同分類已存在')
        return Category.create({ name: req.body.name })
      })
      .then(newCategory => cb(null, newCategory))
      .catch(err => cb(err))
  },
  putCategory: async (req, cb) => {
    try {
      const category = await Category.findByPk(req.params.id)
      if (!category) throw new Error('找不到此分類')
      if (category.toJSON().name === req.body.name) throw new Error('修改的名稱與目前名稱相同')
      await category.update({ name: req.body.name })
      await category.save()
      return cb(null, category)
    } catch (err) {
      console.log(err)
      return cb(err)
    }
  },
  deleteCategory: (req, cb) => {
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error('找不到此分類')
        return category.destroy()
      })
      .then(deletedCategory => cb(null, deletedCategory))
      .catch(err => cb(err))
  }
}

module.exports = categoryService