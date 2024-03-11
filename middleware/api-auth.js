const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => { // (err, user) 是cb函式
    if (err || !user) return res.status(403).json({ status: 'error', message: '請先登入' })
    user = user.toJSON()
    delete user.password
    req.user = user  // 被cb覆蓋掉了 記得寫回來 否則登入不會有req.user
    return next()
  })(req, res, next)
}

const authenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()
  return res.status(403).json({ status: 'error', message: '非管理員身分' })
}


module.exports = {
  authenticated,
  authenticatedAdmin
}