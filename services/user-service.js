const { User } = require('.././models')
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
      attributes: { exclude: ['password'] }
    }).then(user => {
      if (!user) throw new Error('此用戶不存在')
      return cb(null, user)
    })
      .catch(err => cb(err))
  },
  putUser: async (req, cb) => {
    try {
      let user = await User.findByPk(req.params.id)
      const avatar = req.file ? await fileHelper.fileToJpeg(req.file) : null
      const { name, email, phone, county } = req.body
      if (!user) throw new Error('使用者不存在!')
      await user.update({
        name: name || user.name,
        avatar: avatar || user.avatar,
        email: email || user.email,
        phone: phone || user.phone,
        county: county || user.county
      })
      await user.save()
      user = user.toJSON()
      delete user.password
      return cb(null, user)
    }
    catch (err) {
      console.log(err)
      return cb(err)
    }

  }

}

module.exports = userService