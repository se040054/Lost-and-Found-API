const claimService = require('../services/claim-service')
const claimController = {
  postClaim: (req, res, next) => {
    claimService.postClaim(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  getClaimSubmitted: (req, res, next) => {
    claimService.getClaimSubmitted(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  getClaimReceived: (req, res, next) => {
    claimService.getClaimReceived(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  putClaim: (req, res, next) => {
    claimService.putClaim(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  },
  getClaim: (req, res, next) => {
    claimService.getClaim(req, (err, apiData) => {
      if (err) return next(err)
      else return res.json({ status: 'success', apiData })
    })
  }
}

module.exports = claimController