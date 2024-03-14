const express = require('express')
const router = express.Router()

const favoriteController = require('../controllers/favorite-controller')

const { authenticated } = require('../middleware/api-auth')

router.post('/favorites/:itemId', authenticated, favoriteController.postFavorite)
router.delete('/favorites/:itemId', authenticated, favoriteController.deleteFavorite)
router.get('/favorites/mine',authenticated,favoriteController.getMyFavorites)
module.exports = router