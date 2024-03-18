const commentService = require('../services/comment-service')

const commentController = {
  postComment: (req, res, next) => {
    if (!req.body.text) throw new Error('留言不能為空')
    commentService.postComment(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  deleteComment:(req,res,next)=>{
    commentService.deleteComment(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  adminDeleteComment: (req, res, next) => {
    commentService.adminDeleteComment(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }
}
module.exports = commentController