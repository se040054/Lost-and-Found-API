const { User } = require('../models')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
}
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
  usernameField: 'account',
  passwordField: 'password',
  passReqToCallback: true, // 把user丟進req.user
  session: false
},
  (req, account, password, cb) => {
    return User.findOne({ where: { account } })
      .then(user => {
        if (!user) return cb(new Error("用戶不存在"), false)
        bcrypt.compare(password, user.password).then(res => {
          if (!res) return cb(new Error("密碼錯誤"), false)
          return cb(null, user)
        })
      })
      .catch(err => cb(err))
  }
));

passport.use(new JwtStrategy(jwtOpts, (jwtPayload, cb) => {
  return User.findByPk(jwtPayload.id)
    .then(user => {
      if (!user) return cb(new Error('用戶不存在'), false) // 注意這裡的錯誤 不會給控制器抓到 而是處置器
      return cb(null, user)
    })
    .catch(err => cb(err, false))
}));

module.exports = passport