const userService = require('../services/user-service')

const userController = {
  register: (req, res,next) => {
    const { account, password, confirmPassword, name } = req.body
    if (!account || !password || !confirmPassword || !name) throw new Error('帳號、密碼、確認密碼、名稱不能為空')
    if (confirmPassword !== password) throw new Error('密碼不一致')
    userService.register(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }
}

module.exports = userController