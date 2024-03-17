const { User, Merchant, Item } = require('.././models')
const bcrypt = require('bcryptjs')
const fileHelper = require('../helpers/file-helper')
const userService = {
  register: (req, cb) => {
    const { account, password, name } = req.body
    return User.findOne({ where: { account } })
      .then(findUser => {
        if (findUser) throw new Error('帳號已被註冊')
        const SALT_LENGTH = 8
        return bcrypt.hash(password, SALT_LENGTH)
      })
      .then(password => {
        return User.create({ account, password, name })
      })
      .then(createdUser => {
        const user = { account: createdUser.account, name: createdUser.name }
        // console.log('service層,user創建完:' + JSON.stringify(user))
        return cb(null, user)
      }
      )
      .catch(err => cb(err))
  },
  getUser: (req, cb) => {
    return User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Merchant },
        { model: Item }
      ]
    }
    ).then(user => {
      if (!user) throw new Error('此用戶不存在')
      return cb(null, user)
    })
      .catch(err => cb(err))
  },
  putUser: async (req, cb) => {
    try {
      let user = await User.findByPk(req.params.id)
      const avatar = req.file ? await fileHelper.fileToJpegUser(req.file) : null
      if (!user) throw new Error('使用者不存在!')
      await user.update({
        name: req.body.name || user.name,
        avatar: avatar || user.avatar,
        email: req.body.email || user.email,
        phone: req.body.phone || user.phone,
        county: req.body.county || user.county
      })
      await user.save()
      user = user.toJSON() // 這裡要先轉換才能刪除屬性
      delete user.password
      return cb(null, user)
    }
    catch (err) {
      console.log(err)
      return cb(err)
    }
  },
  putUserPassword: async (req, cb) => {
    try {
      const user = await User.findByPk(req.user.id)
      console.log(user.password, req.body.oldPassword)
      const verify = await bcrypt.compare(req.body.oldPassword, user.password) // 字串在前hash在後
      const same = await bcrypt.compare(req.body.newPassword, user.password)
      if (!verify) throw new Error('密碼錯誤')
      if (same) throw new Error('修改後的密碼與原密碼相同')
      const SALT_LENGTH = 8
      const newPassword = await bcrypt.hash(req.body.newPassword, SALT_LENGTH)
      await user.update({ password: newPassword })
      await user.save()
      return cb(null, `${user.name} ,修改密碼成功! `) // 只修改密碼，但不返回密碼， 只返回使用者名稱 + 成功資訊
    } catch (err) {
      cb(err)
    }
  }

}

module.exports = userService