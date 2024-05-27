const { User, Merchant, Item } = require('.././models')
const bcrypt = require('bcryptjs')
const fileHelper = require('../helpers/file-helper')
const jwt = require('jsonwebtoken')

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
    })
      .then(user => {
        if (!user) throw new Error('此用戶不存在')
        return cb(null, user)
      })
      .catch(err => cb(err))
  },
  putUser: async (req, cb) => {
    try {
      let user = await User.findByPk(req.params.id)
      // const avatar = req.file ? await fileHelper.fileToJpegUser(req.file) : null
      let path;
      if (req.file) {
        const photo = req.file
        if (!photo.mimetype.startsWith('image')) {
          throw new Error('圖片格式不正確');
        }
        const maxSize = 5 * 1024 * 1024; // 5MB
        console.log("大小" + photo.size)
        if (photo.size > maxSize) throw new Error('圖片太大了');
        path = `${process.env.LOCAL_URL}/temp/${photo.filename}`
      }
      if (!user) throw new Error('使用者不存在!')
      await user.update({
        name: req.body.name || user.name,
        avatar: path || user.avatar,
        email: req.body.email || user.email,
        phone: req.body.phone || user.phone,
        county: req.body.county || user.county
      })
      await user.save()
      user = user.toJSON() // 這裡要先轉換才能刪除屬性
      delete user.password


      const jwtToken = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '120d' })
      return cb(null, { user, jwtToken })
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
      if (!verify) throw new Error('原密碼錯誤')
      if (same) throw new Error('修改後的密碼與原密碼相同')
      const SALT_LENGTH = 8
      const newPassword = await bcrypt.hash(req.body.newPassword, SALT_LENGTH)
      await user.update({ password: newPassword })
      await user.save()
      return cb(null, `${user.name} ,修改密碼成功! `) // 只修改密碼，但不返回密碼， 只返回使用者名稱 + 成功資訊
    } catch (err) {
      cb(err)
    }
  },
  googleLogin: async (req, cb) => {
    try {
      let user = await User.findOne({ where: { email: req.body.email } })
      if (!user) {
        const SALT_LENGTH = 8
        user = await User.create({
          account: bcrypt.hashSync(Math.random().toString(36).slice(2), SALT_LENGTH), // 隨機產生帳戶,
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(Math.random().toString(36).slice(2), SALT_LENGTH) // 隨機產生密碼
        })
        await user.update({ avatar: req.body.avatar || null }) // 目前先將google頭貼修改功能放在後端
        await user.reload() // 重新取得新創帳戶完整資訊 否則只會有上述資訊 (非必要)
      }
      const userData = user.toJSON() //此時user還是sequelize模型實例 要轉換成JSON物件才可以使用
      delete userData.password
      const jwtToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
      return cb(null, {
        user: userData,
        token: jwtToken
      })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = userService