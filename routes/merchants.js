const express = require('express')
const router = express.Router()
const merchantController = require('../controllers/merchant-controller')
const { authenticated } = require('../middleware/api-auth')
const upload = require('../middleware/multer')

router.post('/merchants', authenticated, upload.single('logo'), merchantController.postMerchant)
router.get('/merchants', merchantController.getMerchants)
router.get('/merchants/:id', merchantController.getMerchant)
router.put('/merchants/:id', authenticated, upload.single('logo'), merchantController.putMerchant)

module.exports = router