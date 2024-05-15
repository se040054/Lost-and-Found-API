const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/category-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')

router.get('/categories', categoryController.getCategories)
router.get('/categories/:id', categoryController.getCategory)
router.post('/categories', authenticated, authenticatedAdmin, categoryController.postCategory)
// 管理員驗證前也需要一般登入驗證
router.put('/categories/:id', authenticated, authenticatedAdmin, categoryController.putCategory)
router.delete('/categories/:id', authenticated, authenticatedAdmin, categoryController.deleteCategory)

module.exports = router