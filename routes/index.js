const express = require('express')
const router = express.Router()

const users = require('./users')
const home = require('./home')
const { errorHandler } = require('../middleware/error-handler')

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.use(users)
router.use(home)
router.use(errorHandler)
module.exports = router