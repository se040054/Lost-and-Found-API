const { User } = require('.././models')
const bcrypt = require('bcryptjs')

const userService = {
  register: (req, cb) => {
    const { account, password, name } = req.body
    return User.findOne({ where: { account } })
      .then(user => {
        if (user) throw new Error('帳號已被註冊')
        return bcrypt.hash(password, 8)
      })
      .then(password => {
        return User.create({ account, password, name })
      })
      .then(user => {
        console.log('service層,user創建完:' + user)
        return cb(null, user)
      }
      )
      .catch(err => cb(err))
  },

}

module.exports = userService