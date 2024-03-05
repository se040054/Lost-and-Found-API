const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const userController = require('../controllers/user-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')

router.post('/users/register', userController.register)
router.post('/users/login', userController.beforeLogin, passport.authenticate('local', { session: false }), userController.login)
router.get('/users/:id',userController.getUser)


// router.get('/users/testLogin', authenticated, (req, res) => {
//   return res.json({
//     status: "成功驗證登入身分",
//     user: req.user
//   })
// })
// router.get('/users/testAdmin', authenticated, authenticatedAdmin, (req, res) => {
//   return res.json({
//     status: "成功驗證登入身分",
//     user: req.user
//   })
// })

module.exports = router