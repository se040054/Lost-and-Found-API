const { Comment, Item } = require('../models')

const commentService = {
  postComment: (req, cb) => {
    return Item.findByPk(req.params.itemId)
      .then(item => {
        if (!item) throw new Error('物品不存在')
        return Comment.create({
          text: req.body.text,
          userId: req.user.id,
          itemId: req.params.itemId
        })
      })
      .then(comment => cb(null, comment))
      .catch(err => cb(err))
  }
}

module.exports = commentService