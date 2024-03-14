const express = require('express')
const router = express.Router()

const favoriteController = require('../controllers/favorite-controller')

const { authenticated } = require('../middleware/api-auth')

router.post('/favorites/:itemId', authenticated, favoriteController.postFavorite)


module.exports = router