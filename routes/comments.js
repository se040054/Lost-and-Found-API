const express = require('express')
const router = express.Router()

const commentController = require('../controllers/comment-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')

router.post('/comments/:itemId',authenticated,commentController.postComment)
router.delete('/comments/:id',authenticated , commentController.deleteComment)
router.delete('/comments/:id/admin',authenticated,authenticatedAdmin,commentController.adminDeleteComment)
module.exports = router