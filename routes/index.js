const express = require('express')
const router = express.Router()

const users = require('./users')

const home = require('./home')


router.get('/', (req, res) => {
  res.redirect('/home')
})

router.use(users)
router.use(home)

module.exports = router