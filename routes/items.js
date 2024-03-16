const express = require('express')
const router = express.Router()
const { authenticated } = require('../middleware/api-auth')
const itemController = require('../controllers/item-controller')
const upload = require('../middleware/multer')

router.get('/items', itemController.getItems)
router.get('/items/:id',itemController.getItem)
router.post('/items', authenticated, upload.single('photo'), itemController.postItem)
router.put('/items/:id', authenticated, upload.single('photo'), itemController.putItem)
router.delete('/items/:id',authenticated,itemController.deleteItem)
router.post('/items/:id/claim', authenticated, itemController.claimItem)
module.exports = router 