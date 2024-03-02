const express = require('express')
const router = express.Router()

router.get('/home', (req, res) => {
  return res.json('這裡是首頁')
})

module.exports = router