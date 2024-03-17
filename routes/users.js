const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const userController = require('../controllers/user-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')
const upload = require('../middleware/multer')

router.post('/users/register', userController.register)
router.post('/users/login', userController.beforeLogin, passport.authenticate('local', { session: false }), userController.login)
router.post('/users/googleLogin',userController.googleLogin)
router.get('/users/:id', userController.getUser)
router.put('/users/:id', authenticated, upload.single('avatar'), userController.putUser)
router.put('/users/:id/password',authenticated,userController.putUserPassword)
module.exports = router