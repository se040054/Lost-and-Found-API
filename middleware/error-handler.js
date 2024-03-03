module.exports = {
  errorHandler(err, req, res, next) {
    if (err instanceof Error) { // 是自行產生的Error
      return res.status(400).json({
        status: 'error',
        message: `${err.message} `,
        errLog: `錯誤:${err}, 錯誤名稱:${err.name}, 錯誤訊息:${err.message}`
      })
    } else {
      return res.status(500).json({
        status: 'error',
        message: `${err.name} : ${err.message} `,
        errLog: `錯誤:${err}, 錯誤名稱:${err.name}, 錯誤訊息:${err.message}`
      })
    }
  }
}
