const moment = require('moment')
const CryptoJS = require('crypto-js')
const crypto = require('crypto')
const axios = require('axios')
const Transaction = require('../models/orderModel')
const Booking = require('../models/bookingModel')

const createOrderZaloPay = async (req, res) => {
  const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
  }
  const user_id = req.user._id
  const { booking_id, items, description, amount } = req.body
  const embed_data = {
    redirecturl: 'http://localhost:5173/order'
  }

  const transID = Math.floor(Math.random() * 1000000)

  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
    app_user: 'user123',
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount,
    callback_url: 'http://localhost:4000/api/order/callback-zalopay',
    description: description,
    bank_code: ''
  }

  const data =
    config.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()
  try {
    try {
      const result = await axios.post(config.endpoint, null, { params: order })
      if (result.data.sub_return_code === 1) {
        const transaction = new Transaction({
          user_id: user_id,
          booking_id: booking_id,
          transaction_code: order.app_trans_id,
          amount: amount,
          description: description,
          items: items,
          payment_method: 'ZaloPay',
          transaction_date: new Date()
        })

        await transaction.save()

        const booking = await Booking.findById(booking_id)
        if (booking) {
          booking.status = 'paid'
          await booking.save()
        }

        return res.status(200).json({
          message: 'Transaction successful',
          data: result.data
        })
      } else {
        return res.status(400).json({
          message: 'Transaction failed',
          error: result.data
        })
      }
    } catch (error) {
      console.error('Error creating ZaloPay order:', error)
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const callbackZaloPay = async (req, res) => {
  const config = {
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz'
  }

  let result = {}
  console.log(req.body)
  try {
    let dataStr = req.body.data
    let reqMac = req.body.mac

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString()
    console.log('mac =', mac)

    if (reqMac !== mac) {
      result.return_code = -1
      result.return_message = 'MAC not equal'
      result.redirect_url = 'http://localhost:5173/payment-failed'
    } else {
      const transaction = await Transaction.findOneAndUpdate(
        { transaction_code: dataJson.app_trans_id },
        { payment_status: dataJson.return_code === 1 ? 'Success' : 'Failed' },
        { new: true }
      )

      console.log('Updated transaction:', transaction)

      if (dataJson.return_code === 1) {
        result.return_code = 1
        result.return_message = 'Success'
        result.redirect_url = 'http://localhost:5173/payment-success'
      } else {
        result.return_code = 0
        result.return_message = 'Failed'
        result.redirect_url = 'http://localhost:5173/payment-failed'
      }
    }
  } catch (ex) {
    console.log('Error:', ex.message)
    result.return_code = 0
    result.return_message = ex.message
    result.redirect_url = 'http://localhost:5173/payment-failed'
  }
  res.json(result)
}

const createOrderMomo = async (req, res) => {
  const user_id = req.user._id
  const { booking_id, items, description, amount } = req.body
  const config = {
    accessKey: 'F8BBA842ECF85',
    secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
    orderInfo: 'pay with MoMo',
    partnerCode: 'MOMO',
    redirectUrl: 'http://localhost:5173/order',
    ipnUrl: 'https://0778-14-178-58-205.ngrok-free.app/callback',
    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    requestType: 'payWithMethod',
    extraData: '',
    orderGroupId: '',
    autoCapture: true,
    lang: 'vi'
  }

  let {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    extraData,
    orderGroupId,
    autoCapture,
    lang
  } = config
  var orderId = partnerCode + new Date().getTime()
  var requestId = orderId

  var rawSignature =
    'accessKey=' +
    accessKey +
    '&amount=' +
    amount +
    '&extraData=' +
    extraData +
    '&ipnUrl=' +
    ipnUrl +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&partnerCode=' +
    partnerCode +
    '&redirectUrl=' +
    redirectUrl +
    '&requestId=' +
    requestId +
    '&requestType=' +
    requestType

  var signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex')

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature
  })

  const options = {
    method: 'POST',
    url: config.url,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  }

  try {
    const result = await axios(options)

    if (result.data.resultCode === 0) {
      const transaction = new Transaction({
        user_id: user_id,
        booking_id: booking_id,
        transaction_code: orderId,
        amount: amount,
        description: description,
        items: items,
        payment_method: 'momo',
        transaction_date: new Date()
      })

      await transaction.save()

      return res.status(200).json({
        message: 'Transaction successful',
        data: result.data
      })
    } else {
      return res.status(400).json({
        message: 'Transaction failed',
        error: result.data
      })
    }
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message })
  }
}

module.exports = { createOrderZaloPay, callbackZaloPay, createOrderMomo }
