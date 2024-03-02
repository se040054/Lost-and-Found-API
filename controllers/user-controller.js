const userService = require('../services/user-service')

const userController = {
  register: (req, res) => {
    const { account, password, confirmPassword, name } = req.body
    if (!account || !password || !confirmPassword || !name) return res.status(400).json({ status: 'error', message: '帳號、密碼、確認密碼、名稱不能為空' }) // res.send後要加return 否則程式會繼續往下運行
    if (confirmPassword !== password) return res.status(400).json({ status: 'error', message: '密碼不一致' })
    userService.register(req, (err,data) => {
      if (err) return res.status(400).json({ status: 'error', message: err.message })
      else return res.json({ data })
    })
  }
}

module.exports = userController