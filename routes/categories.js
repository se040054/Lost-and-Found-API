const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/category-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')

router.get('/categories', categoryController.getCategories)
router.post('/categories',authenticated,authenticatedAdmin,categoryController.postCategories) 
// 管理員驗證前也需要一般登入驗證

module.exports = router