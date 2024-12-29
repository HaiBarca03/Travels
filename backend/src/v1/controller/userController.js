UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const { genneralToken } = require('../utils/jwtService')
const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const registerUser = async (req, res) => {
  const { name, email, phone, password, addresses, confirmPassword } = req.body

  try {
    const exists = await UserModel.findOne({ email })
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' })
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Please enter a valid email' })
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      })
    }

    if (phone.length !== 10 || !validator.isMobilePhone(phone, 'any')) {
      return res
        .status(400)
        .json({ success: false, message: 'Please enter a valid phone number' })
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Passwords do not match' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      name,
      email,
      phone,
      addresses,
      password: hashedPassword
    })

    const user = await newUser.save()

    res.status(201).json({
      success: true,
      data: user,
      message: 'Account created successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User does not exists' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid information' })
    }

    const token = await genneralToken({
      id: user.id,
      isAdmin: user.isAdmin
    })

    console.log('token', token)
    const response = {
      success: true,
      token: token,
      user: user
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      samesite: 'Strict'
    })
    console.log('token', token)
    res.json(response)
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error' })
  }
}

const logoutUser = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      samesite: 'Strict'
    })

    res.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.log('Logout error:', error)
    res.status(500).json({ success: false, message: 'Error logging out' })
  }
}

const getAllUser = async (req, res) => {
  try {
    const allUser = await UserModel.find()
    res.json({
      success: true,
      data: allUser
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error get user' })
  }
}

const getUserDetail = async (req, res) => {
  try {
    const { userId } = req.params
    const UserDetail = await UserModel.findById(userId)
    if (!UserDetail) {
      res.json({
        success: false,
        message: 'User not pound'
      })
    }
    res.json({
      success: true,
      data: UserDetail
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error get user' })
  }
}

const updateUser = async (req, res) => {
  const userId = req.user._id
  const data = req.body

  try {
    const checkUser = await UserModel.findById(userId)
    if (!checkUser) {
      return res.json({ success: false, message: 'User does not exist' })
    }

    let newAvatar = checkUser.avatar
    console.log('newAvatar', newAvatar)
    if (req.file) {
      if (checkUser.avatar && checkUser.avatar._id) {
        await cloudinary.uploader.destroy(checkUser.avatar._id)
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Home/users'
      })

      newAvatar = {
        public_id: result.public_id,
        url: result.secure_url
      }

      fs.unlinkSync(req.file.path)
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { ...data, avatar: newAvatar },
      { new: true }
    )

    if (!updatedUser) {
      return res.json({ success: false, message: 'Failed to update user' })
    }

    res.json({
      success: true,
      data: updatedUser
    })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error updating user' })
  }
}

const deleteUser = async (req, res) => {
  const userId = req.user._id
  console.log('userId', userId)
  const { password } = req.body
  try {
    const user = await UserModel.findById(userId)
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({ success: false, message: 'Incorrect password' })
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    if (user.avatar && user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id)
    }

    await UserModel.findByIdAndDelete(userId)

    res.json({ success: true, message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error deleting user' })
  }
}

const adminDeleteUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await UserModel.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    if (user.avatar && user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id)
    }

    await UserModel.findByIdAndDelete(userId)

    res.json({ success: true, message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error deleting user' })
  }
}

const updateUserRole = async (req, res) => {
  const { userId } = req.params
  const { role } = req.body

  const validRoles = ['customer', 'admin', 'vendor']
  if (!validRoles.includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role' })
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json({
      success: true,
      message: 'Role updated successfully',
      data: updatedUser
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Error updating role' })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  getUserDetail,
  updateUser,
  deleteUser,
  adminDeleteUser,
  updateUserRole,
  logoutUser
}
