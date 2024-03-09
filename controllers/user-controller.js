const userService = require('../services/user-service')
const jwt = require('jsonwebtoken')
const userController = {
  register: (req, res, next) => {
    const { account, password, confirmPassword, name } = req.body
    if (!account || !password || !confirmPassword || !name) throw new Error('帳號、密碼、確認密碼、名稱不能為空')
    if (confirmPassword !== password) throw new Error('密碼不一致')
    userService.register(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  beforeLogin: (req, res, next) => {
    const { account, password } = req.body
    if (!account || !password) throw new Error('必須輸入帳號密碼')
    return next()
  },
  login: (req, res, next) => {
    try {
      const userData = req.user.toJSON() //此時req.user還是sequelize模型實例 要轉換成JSON物件才可以使用
      delete userData.password
      const jwtToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
      return res.json({
        status: 'success',
        apiData: { jwtToken, user: userData }
      })
    }
    catch (err) {
      next(err)
    }
  },
  getUser: (req, res, next) => {
    userService.getUser(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  putUser: (req, res, next) => {
    const { name, email, phone, county } = req.body
    if (!name && !req.file && !email && !phone && !county ) throw new Error('未修改任何資料')
    if (req.user.id !== Number(req.params.id)) throw new Error('僅能修改當前登入使用者')
    if (req.body.phone) {
      const phone = Number(req.body.phone)
      if (!Number.isFinite(phone) || !Number.isInteger(phone) || req.body.phone.length !== 10) throw new Error('行動電話必須為10位整數')
    }
    userService.putUser(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }

}

module.exports = userController