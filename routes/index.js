const express = require('express')
const router = express.Router()

const users = require('./users')
const merchants = require('./merchants')
const items = require('./items')
const categories = require('./categories')
const favorites = require('./favorites')
const comments =require('./comments')

const { errorHandler } = require('../middleware/error-handler')

router.use(users)
router.use(merchants)
router.use(items)
router.use(categories)
router.use(favorites)
router.use(comments)

router.use(errorHandler)

module.exports = router