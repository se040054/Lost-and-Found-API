const express = require('express')
const { authenticated } = require('../middleware/api-auth')
const claimController = require('../controllers/claim-controller')
const router = express.Router()



router.get('/claims/submitted',authenticated ,claimController.getClaimSubmitted)
router.get('/claims/received', authenticated, claimController.getClaimReceived)
router.post('/claims/:itemId', authenticated, claimController.postClaim)
router.put('/claims/:id', authenticated, claimController.putClaim)


module.exports = router