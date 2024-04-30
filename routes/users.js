const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const userController = require('../controllers/user-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')
const upload = require('../middleware/multer')



// 驗證身分
router.get('/users/authLogin', authenticated, userController.authLogin)
router.get('/users/authAdmin', authenticated, authenticatedAdmin, userController.authAdmin)
// 使用者功能
router.get('/users/:id', userController.getUser)
router.post('/users/register', userController.register)
router.post('/users/login', userController.beforeLogin, passport.authenticate('local', { session: false }), userController.login)
router.post('/users/googleLogin', userController.googleLogin)
router.put('/users/:id', authenticated, upload.single('avatar'), userController.putUser)
router.put('/users/:id/password', authenticated, userController.putUserPassword)

module.exports = router