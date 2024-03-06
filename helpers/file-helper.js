const sharp = require('sharp')
const fs = require('fs')
const fileToJpeg = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null) //如果沒有檔案就終止
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return reject(new Error('僅接受jpg 、jpeg 、png '))
    const newImagePath = `public/images/${file.originalname}`
    return fs.promises.readFile(file.path) // readFile回傳一個buffer
      .then(data => sharp(data).resize(200, 200).toFile(newImagePath))
      .then(() => resolve(`${process.env.LOCAL_URL}/images/${file.originalname}`))
      .catch(err => reject(err))
  })
}

module.exports = {
  fileToJpeg // (非同步)接受一個file ，將檔案轉為200*200的jpeg儲存於伺服器中，回傳jpeg檔案的路徑
}


