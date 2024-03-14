const favoriteService = require('../services/favorite-service')

const favoriteController = {
  postFavorite: (req, res, next) => {
    favoriteService.postFavorite(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }
}

module.exports = favoriteController