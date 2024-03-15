const express = require('express')
const router = express.Router()

const commentController = require('../controllers/comment-controller')
const { authenticated } = require('../middleware/api-auth')

router.post('/comments/:itemId',authenticated,commentController.postComment)

module.exports = router