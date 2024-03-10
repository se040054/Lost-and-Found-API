const express = require('express')
const router = express.Router()

const home = require('./home')
const users = require('./users')
const merchants = require('./merchants')
const items = require('./items')
const categories = require('./categories')

const { errorHandler } = require('../middleware/error-handler')

router.use(home)
router.use(users)
router.use(merchants)
router.use(items)
router.use(categories)

router.use(errorHandler)

module.exports = router