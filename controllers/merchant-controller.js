const merchantService = require('../services/merchant-service')

const merchantController = {
  postMerchant: (req, res, next) => {
    let { name, address, phone } = req.body
    if (!name || !address || !phone) throw new Error('請填寫必要資訊')
    const convertPhone = Number(req.body.phone)
    if (!Number.isFinite(convertPhone) || !Number.isInteger(convertPhone) ||
      (req.body.phone.length !== 10 && req.body.phone.length !== 9)) throw new Error('商家電話必須為9位(市話)或10位(行動)')
    merchantService.postMerchant(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  getMerchant: (req, res, next) => {
    merchantService.getMerchant(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  putMerchant: (req, res, next) => {
    const {name,address, phone} = req.body
    if (!name && !address && !phone && !req.file) throw new Error('未修改任何資料')
    const convertPhone = Number(req.body.phone)
    if (!Number.isFinite(convertPhone) || !Number.isInteger(convertPhone) ||
      (req.body.phone.length !== 10 && req.body.phone.length !== 9)) throw new Error('商家電話必須為9位(市話)或10位(行動)')
    merchantService.putMerchant(req, (err, apiData)=>{
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  getMerchants:(req,res,next)=>{
    merchantService.getMerchants(req,(err,apiData)=>{
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
    }
  

}

module.exports = merchantController