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
  },
  deleteComment: (req, cb) => {
    return Comment.findByPk(req.params.id)
      .then(comment => {
        if (!comment) throw new Error('留言不存在')
        if (comment.userId !== req.user.id) throw new Error('無法刪除他人的留言')
        return comment.destroy()
      })
      .then(deletedComment => cb(null, deletedComment))
      .catch(err => cb(err))
  },
  adminDeleteComment: (req, cb) => {
    return Comment.findByPk(req.params.id)
      .then(comment => {
        if (!comment) throw new Error('留言不存在')
        return comment.destroy()
      })
      .then(deletedComment => cb(null, deletedComment))
      .catch(err => cb(err))
  }
}

module.exports = commentService