const express = require('express')
const router = express.Router()
const users = require('./users')
const merchants =require('./merchants')
const home = require('./home')
const { errorHandler } = require('../middleware/error-handler')

router.use(users)
router.use(merchants)
router.use(home)
router.use(errorHandler)

module.exports = router