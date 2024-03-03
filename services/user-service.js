const { User } = require('.././models')
const bcrypt = require('bcryptjs')

const userService = {
  register: (req, cb) => {
    const { account, password, name } = req.body
    return User.findOne({ where: { account } })
      .then(findUser => {
        if (findUser) throw new Error('帳號已被註冊')
        return bcrypt.hash(password, 8)
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

}

module.exports = userService