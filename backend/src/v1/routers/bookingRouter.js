const express = require('express')
const {
  createBooking,
  getBookingsByUserId,
  getBookingById,
  cancelBooking,
  deleteBookingById,
  checkBookingStatus
} = require('../controller/bookingController')
const { authorizeUser } = require('../middleware/auth')

const bookingRouter = express.Router()
bookingRouter.post('/create-booking', authorizeUser, createBooking)
bookingRouter.get('/get-booking-by-user', authorizeUser, getBookingsByUserId)
bookingRouter.get('/get-booking/:bookingId', authorizeUser, getBookingById)
bookingRouter.put('/cancel-booking/:bookingId', authorizeUser, cancelBooking)
bookingRouter.delete('/:bookingId', authorizeUser, deleteBookingById)
bookingRouter.post('/check-booking-status', checkBookingStatus)

module.exports = bookingRouter
