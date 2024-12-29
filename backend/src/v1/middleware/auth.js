const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authorizeUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.token
    const token = authHeader && authHeader.split(' ')[1]
    console.log('token', token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token missing. Authorization denied.'
      })
    }
    const decoded = jwt.verify(token, process.env.TOKEN)

    const user = await UserModel.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Authorization error:', error.message)
    return res.status(401).json({
      success: false,
      message: 'Invalid access token. Authorization denied.'
    })
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.token
    //console.log('authHeader', authHeader)
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token missing. Authorization denied.'
      })
    }
    const decoded = jwt.verify(token, process.env.TOKEN)

    const admin = await UserModel.findById(decoded.id)

    if (!admin) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' })
    }

    if (admin.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Chỉ admin mới có quyền truy cập' })
    }

    next()
  } catch (error) {
    return res.status(500).json({ message: 'Đã xảy ra lỗi', error })
  }
}

const isAdminUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.token
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token missing. Authorization denied.'
      })
    }

    const decoded = jwt.verify(token, process.env.TOKEN)

    const user = await UserModel.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    req.user = user
    console.log('req.user.role', req.user.role)

    if (req.user.role === 'admin' || req.user._id.toString() === decoded.id) {
      return next()
    }

    return res.status(403).json({
      success: false,
      message: 'Only admin or user can access this resource'
    })
  } catch (error) {
    console.error('Authorization error:', error.message)
    return res.status(500).json({ message: 'An error occurred', error })
  }
}

module.exports = { authorizeUser, isAdminUser, isAdmin }
