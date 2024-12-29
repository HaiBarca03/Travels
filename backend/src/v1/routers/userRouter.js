const express = require('express')
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  adminDeleteUser,
  updateUserRole,
  getAllUser,
  getUserDetail,
  logoutUser
} = require('../controller/userController')
const { authorizeUser, isAdminUser, isAdmin } = require('../middleware/auth')
const { uploadAvatar } = require('../utils/uploadCloudinary')

const userRouter = express.Router()
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.get('/get-all-user', getAllUser)
userRouter.get('/get-user-detail/:userId', getUserDetail)
userRouter.put('/update_profile', authorizeUser, uploadAvatar, updateUser)
userRouter.put('/update_role/:userId', isAdmin, updateUserRole)
userRouter.delete('/delete_account', authorizeUser, uploadAvatar, deleteUser)
userRouter.delete(
  '/admin-delete-account/:userId',
  isAdmin,
  uploadAvatar,
  adminDeleteUser
)

module.exports = userRouter
