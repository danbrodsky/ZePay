import { Router } from 'express'
var connection = require('../configs/sequelize')
const bodyParser = require('body-parser')

const router = Router()

router.post('/pay', bodyParser.json(), function (req, res, next) {
  var initPayment = require('./ripple.js');
  console.log(req)
  initPayment(req.body.data.name,req.body.data.amount,req.body.data.recipient,req.body.data.message);

  res.send('/payment/success')
})

export default router
