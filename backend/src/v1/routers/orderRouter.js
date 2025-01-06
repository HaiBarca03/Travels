const express = require('express')
const {
  createOrderZaloPay,
  callbackZaloPay,
  createOrderMomo
} = require('../controller/orderController')
const { authorizeUser, isAdminUser, isAdmin } = require('../middleware/auth')
const orderRouter = express.Router()

orderRouter.post('/order-zalo-pay', authorizeUser, createOrderZaloPay)
orderRouter.post('/order-momo', authorizeUser, createOrderMomo)
orderRouter.post('/callback-zalopay', callbackZaloPay)

module.exports = orderRouter
