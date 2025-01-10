const accommodationsModel = require('../models/accommodationsModel')
const bookingModel = require('../models/bookingModel')
const restaurantModel = require('../models/restaurantModel')
const touristAttractionModel = require('../models/touristAttractionModel')
const Tour = require('../models/tourModel')
const featuresApp = require('../utils/features')

const createBooking = async (req, res) => {
  try {
    const user_id = req.user._id
    const {
      tour_id,
      tourist_id,
      restaurant_id,
      hotel_id,
      quantity,
      groupAdultInformation,
      groupChildrenInformation,
      payment_method
    } = req.body

    if (!user_id) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const bookingQuantity = quantity || 1
    let totalCost = 0

    if (groupAdultInformation && groupAdultInformation.length > 0) {
      for (const adult of groupAdultInformation) {
        if (!adult.name || !adult.gender || !adult.birth) {
          return res.status(400).json({ message: 'Invalid adult information' })
        }
        const birthDate = new Date(adult.birth)
        if (birthDate >= new Date()) {
          return res.status(400).json({
            message: `Adult birth date must be earlier than today (${adult.name}).`
          })
        }
      }
    }

    if (groupChildrenInformation && groupChildrenInformation.length > 0) {
      for (const child of groupChildrenInformation) {
        if (child.birth) {
          const birthDate = new Date(child.birth)
          const today = new Date()
          if (birthDate >= today) {
            return res.status(400).json({
              message: `Child birth date must be earlier than today (${
                child.name || 'Unnamed child'
              }).`
            })
          }
          const ageInYears = today.getFullYear() - birthDate.getFullYear()
          const isBeforeBirthday =
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
              today.getDate() < birthDate.getDate())
          if (isBeforeBirthday) {
            ageInYears -= 1
          }
          if (ageInYears > 2) {
            return res.status(400).json({
              message: `Child (${
                child.name || 'Unnamed child'
              }) is older than 2 years and cannot be classified as an infant.`
            })
          }
        }
      }
    }

    if (tour_id) {
      const tour = await Tour.findById(tour_id)
      if (!tour) return res.status(404).json({ message: 'Tour not found' })
      totalCost += tour.price * bookingQuantity
    }

    if (tourist_id) {
      const touristAttraction = await touristAttractionModel.findById(
        tourist_id
      )
      if (!touristAttraction)
        return res.status(404).json({ message: 'Tourist attraction not found' })
      totalCost += touristAttraction.price * bookingQuantity
    }

    if (restaurant_id) {
      const restaurant = await restaurantModel.findById(restaurant_id)
      if (!restaurant)
        return res.status(404).json({ message: 'Restaurant not found' })
      totalCost += restaurant.price * bookingQuantity
    }

    if (hotel_id) {
      const hotel = await accommodationsModel.findById(hotel_id)
      if (!hotel) return res.status(404).json({ message: 'Hotel not found' })
      totalCost += hotel.price * bookingQuantity
    }

    const newBooking = await bookingModel.create({
      user_id,
      tour_id,
      tourist_id,
      restaurant_id,
      hotel_id,
      groupAdultInformation,
      groupChildrenInformation,
      payment_method,
      quantity: bookingQuantity,
      total_cost: totalCost
    })

    if (tour_id) {
      await Tour.findByIdAndUpdate(tour_id, {
        $push: { bookings: newBooking._id }
      })
    }
    if (tourist_id) {
      await touristAttractionModel.findByIdAndUpdate(tourist_id, {
        $push: { bookings: newBooking._id }
      })
    }
    if (restaurant_id) {
      await restaurantModel.findByIdAndUpdate(restaurant_id, {
        $push: { bookings: newBooking._id }
      })
    }
    if (hotel_id) {
      await accommodationsModel.findByIdAndUpdate(hotel_id, {
        $push: { bookings: newBooking._id }
      })
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getBookingsByUserId = async (req, res) => {
  try {
    const user_id = req.user._id
    const queryStr = req.query

    let query = bookingModel.find({ user_id }).sort({ createdAt: -1 })

    const features = new featuresApp(query, queryStr)

    features.search().filter().pagination(10)
    const bookings = await features.query
      .populate('tour_id')
      .populate('tourist_id')
      .populate('restaurant_id')
      .populate('hotel_id')

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: 'No bookings found for this user' })
    }

    const groupedBookings = {
      tours: [],
      touristAttractions: [],
      restaurants: [],
      hotels: []
    }

    bookings.forEach((booking) => {
      if (booking.tour_id) {
        groupedBookings.tours.push(booking)
      }
      if (booking.tourist_id) {
        groupedBookings.touristAttractions.push(booking)
      }
      if (booking.restaurant_id) {
        groupedBookings.restaurants.push(booking)
      }
      if (booking.hotel_id) {
        groupedBookings.hotels.push(booking)
      }
    })

    res.status(200).json({
      message: 'Bookings fetched successfully',
      groupedBookings
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params

    const booking = await bookingModel
      .findById(bookingId)
      .populate('user_id')
      .populate('tour_id')
      .populate('tourist_id')
      .populate('restaurant_id')
      .populate('hotel_id')

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    res.status(200).json({
      message: 'Booking fetched successfully',
      booking
    })
  } catch (error) {
    console.error('Error fetching booking by ID:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params

    const booking = await bookingModel
      .findById(bookingId)
      .populate('tour_id')
      .populate('tourist_id')
      .populate('restaurant_id')
      .populate('hotel_id')

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    booking.status = 'cancel'

    await booking.save()

    res.status(200).json({
      message: 'Booking canceled successfully',
      booking
    })
  } catch (error) {
    console.error('Error canceling booking:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId

    const booking = await bookingModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(bookingId) } },
      { $limit: 1 }
    ])

    if (!booking || booking.length === 0) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    const updates = []

    if (booking[0].tour_id) {
      updates.push(
        tourModel.updateOne(
          { _id: mongoose.Types.ObjectId(booking[0].tour_id) },
          { $pull: { bookings: mongoose.Types.ObjectId(bookingId) } }
        )
      )
    }

    if (booking[0].tourist_id) {
      updates.push(
        touristAttractionModel.updateOne(
          { _id: mongoose.Types.ObjectId(booking[0].tourist_id) },
          { $pull: { bookings: mongoose.Types.ObjectId(bookingId) } }
        )
      )
    }

    if (booking[0].restaurant_id) {
      updates.push(
        restaurantModel.updateOne(
          { _id: mongoose.Types.ObjectId(booking[0].restaurant_id) },
          { $pull: { bookings: mongoose.Types.ObjectId(bookingId) } }
        )
      )
    }

    if (booking[0].hotel_id) {
      updates.push(
        accommodationsModel.updateOne(
          { _id: mongoose.Types.ObjectId(booking[0].hotel_id) },
          { $pull: { bookings: mongoose.Types.ObjectId(bookingId) } }
        )
      )
    }

    await Promise.all(updates)

    await bookingModel.deleteOne({ _id: mongoose.Types.ObjectId(bookingId) })

    res.status(200).json({
      message: 'Booking deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting booking:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const mongoose = require('mongoose')

const checkBookingStatus = async (req, res) => {
  try {
    const { user_id, tour_id, restaurant_id, hotel_id, tourist_id } = req.body
    const query = {
      user_id: new mongoose.Types.ObjectId(user_id),
      status: 'paid',
      ...(tour_id && { tour_id: new mongoose.Types.ObjectId(tour_id) }),
      ...(restaurant_id && {
        restaurant_id: new mongoose.Types.ObjectId(restaurant_id)
      }),
      ...(hotel_id && { hotel_id: new mongoose.Types.ObjectId(hotel_id) }),
      ...(tourist_id && { tourist_id: new mongoose.Types.ObjectId(tourist_id) })
    }

    const bookingExists = await bookingModel.aggregate([
      { $match: query },
      { $limit: 1 }
    ])

    return res.status(200).json({
      success: true,
      hasBooking: !!bookingExists
    })
  } catch (error) {
    console.error('Error checking booking status:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

module.exports = {
  createBooking,
  getBookingsByUserId,
  getBookingById,
  cancelBooking,
  deleteBookingById,
  checkBookingStatus
}
