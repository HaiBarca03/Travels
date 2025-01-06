const Feedback = require('../models/feedbackModel')
const { checkBookingStatus } = require('../controller/bookingController')
const axios = require('axios')
const createFeedback = async (req, res) => {
  try {
    const user_id = req.user.id
    const { tour_id, tourist_id, hotel_id, restaurant_id, comment, rating } =
      req.body

    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    const bookingCheckResponse = await axios.post(
      'http://localhost:4000/api/booking/check-booking-status',
      {
        user_id: user_id,
        tour_id: tour_id,
        tourist_id: tourist_id,
        hotel_id: hotel_id,
        restaurant_id: restaurant_id
      }
    )
    if (!bookingCheckResponse.data.hasBooking) {
      return res.status(400).json({
        status: 'error',
        message: 'You must have a paid booking before leaving feedback.'
      })
    }

    let feedback = await Feedback.findOne({ user_id })

    if (!feedback) {
      feedback = new Feedback({ user_id })
    }

    if (tour_id) {
      feedback.tour.push({
        tour_id,
        comment,
        rating,
        like: 0,
        date: new Date()
      })
    } else if (tourist_id) {
      feedback.tourist.push({
        tourist_id,
        comment,
        rating,
        like: 0,
        date: new Date()
      })
    } else if (hotel_id) {
      feedback.hotel.push({
        hotel_id,
        comment,
        rating,
        like: 0,
        date: new Date()
      })
    } else if (restaurant_id) {
      feedback.restaurant.push({
        restaurant_id,
        comment,
        rating,
        like: 0,
        date: new Date()
      })
    } else {
      return res.status(400).json({
        message:
          'At least one entity (tour, tourist, hotel, or restaurant) must be provided for feedback.'
      })
    }

    await feedback.save()

    return res
      .status(200)
      .json({ message: 'Feedback created successfully', feedback })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error while creating feedback', error: error.message })
  }
}

const updateFeedback = async (req, res) => {
  try {
    const user_id = req.user.id
    const {
      tour_id,
      tourist_id,
      hotel_id,
      restaurant_id,
      comment,
      rating,
      _id
    } = req.body
    console.log('user_id', user_id)
    console.log('req.body', req.body)
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    let feedback = await Feedback.findOne({ user_id })
    if (!feedback) {
      return res
        .status(404)
        .json({ message: 'Feedback not found for this user.' })
    }

    if (tour_id) {
      if (_id) {
        // truy vấn theo index
        const existingTourFeedbackIndex = feedback.tour.findIndex(
          (item) =>
            item._id.toString() === _id && item.tour_id.toString() === tour_id
        )
        if (existingTourFeedbackIndex !== -1) {
          feedback.tour[existingTourFeedbackIndex] = {
            ...feedback.tour[existingTourFeedbackIndex],
            comment,
            rating,
            tour_id: tour_id,
            date: new Date()
          }
        } else {
          return res
            .status(400)
            .json({ message: 'Comment not found for this tour.' })
        }
      } else {
        feedback.tour.push({
          tour_id,
          comment,
          rating,
          like: 0,
          date: new Date()
        })
      }
    } else if (tourist_id) {
      const touristIndex = feedback.tourist.findIndex(
        (item) => item.tourist_id.toString() === tourist_id
      )
      if (touristIndex !== -1) {
        feedback.tourist[touristIndex] = {
          ...feedback.tourist[touristIndex],
          comment,
          rating,
          tourist_id: tourist_id,
          date: new Date()
        }
      } else {
        feedback.tourist.push({
          tourist_id,
          comment,
          rating,
          like: 0,
          date: new Date()
        })
      }
    } else if (hotel_id) {
      const hotelIndex = feedback.hotel.findIndex(
        (item) => item.hotel_id.toString() === hotel_id
      )
      if (hotelIndex !== -1) {
        feedback.hotel[hotelIndex] = {
          ...feedback.hotel[hotelIndex],
          comment,
          rating,
          hotel_id: hotel_id,
          date: new Date()
        }
      } else {
        feedback.hotel.push({
          hotel_id,
          comment,
          rating,
          like: 0,
          date: new Date()
        })
      }
    } else if (restaurant_id) {
      const restaurantIndex = feedback.restaurant.findIndex(
        (item) => item.restaurant_id.toString() === restaurant_id
      )
      if (restaurantIndex !== -1) {
        feedback.restaurant[restaurantIndex] = {
          ...feedback.restaurant[restaurantIndex],
          comment,
          rating,
          restaurant_id: restaurant_id,
          date: new Date()
        }
      } else {
        feedback.restaurant.push({
          restaurant_id,
          comment,
          rating,
          like: 0,
          date: new Date()
        })
      }
    } else {
      return res.status(400).json({
        message:
          'At least one entity (tour, tourist, hotel, or restaurant) must be provided for feedback.'
      })
    }

    await feedback.save()

    return res
      .status(200)
      .json({ message: 'Feedback updated successfully', feedback })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error while updating feedback', error: error.message })
  }
}

const deleteFeedback = async (req, res) => {
  try {
    const user_id = req.user.id
    const { tour_id, tourist_id, hotel_id, restaurant_id, _id } = req.body
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    let feedback = await Feedback.findOne({ user_id })
    if (!feedback) {
      return res
        .status(404)
        .json({ message: 'Feedback not found for this user.' })
    }

    if (tour_id) {
      if (_id) {
        const existingTourFeedbackIndex = feedback.tour.findIndex(
          (item) =>
            item._id.toString() === _id && item.tour_id.toString() === tour_id
        )
        if (existingTourFeedbackIndex !== -1) {
          feedback.tour.splice(existingTourFeedbackIndex, 1)
        } else {
          return res
            .status(400)
            .json({ message: 'Comment not found for this tour.' })
        }
      } else {
        return res
          .status(400)
          .json({ message: 'Comment ID (_id) is required for deletion.' })
      }
    } else if (tourist_id) {
      if (_id) {
        const touristIndex = feedback.tourist.findIndex(
          (item) =>
            item._id.toString() === _id &&
            item.tourist_id.toString() === tourist_id
        )
        if (touristIndex !== -1) {
          feedback.tourist.splice(touristIndex, 1)
        } else {
          return res
            .status(400)
            .json({ message: 'Comment not found for this tourist.' })
        }
      } else {
        return res
          .status(400)
          .json({ message: 'Comment ID (_id) is required for deletion.' })
      }
    } else if (hotel_id) {
      if (_id) {
        const hotelIndex = feedback.hotel.findIndex(
          (item) =>
            item._id.toString() === _id && item.hotel_id.toString() === hotel_id
        )
        if (hotelIndex !== -1) {
          feedback.hotel.splice(hotelIndex, 1)
        } else {
          return res
            .status(400)
            .json({ message: 'Comment not found for this hotel.' })
        }
      } else {
        return res
          .status(400)
          .json({ message: 'Comment ID (_id) is required for deletion.' })
      }
    } else if (restaurant_id) {
      if (_id) {
        const restaurantIndex = feedback.restaurant.findIndex(
          (item) =>
            item._id.toString() === _id &&
            item.restaurant_id.toString() === restaurant_id
        )
        if (restaurantIndex !== -1) {
          feedback.restaurant.splice(restaurantIndex, 1)
        } else {
          return res
            .status(400)
            .json({ message: 'Comment not found for this restaurant.' })
        }
      } else {
        return res
          .status(400)
          .json({ message: 'Comment ID (_id) is required for deletion.' })
      }
    } else {
      return res.status(400).json({
        message:
          'At least one entity (tour, tourist, hotel, or restaurant) must be provided for feedback deletion.'
      })
    }

    await feedback.save()

    return res
      .status(200)
      .json({ message: 'Feedback deleted successfully', feedback })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error while deleting feedback', error: error.message })
  }
}

const getCommentsByEntity = async (req, res) => {
  try {
    const { entity, entity_id } = req.params

    if (!entity || !entity_id) {
      return res
        .status(400)
        .json({ message: 'Entity type and entity ID are required' })
    }

    let feedbacks
    let entityField

    switch (entity) {
      case 'tour':
        entityField = 'tour.tour_id'
        break
      case 'hotel':
        entityField = 'hotel.hotel_id'
        break
      case 'tourist':
        entityField = 'tourist.tourist_id'
        break
      case 'restaurant':
        entityField = 'restaurant.restaurant_id'
        break
      default:
        return res.status(400).json({ message: 'Invalid entity type' })
    }

    feedbacks = await Feedback.find({
      [entityField]: entity_id
    }).populate('user_id')

    if (!feedbacks || feedbacks.length === 0) {
      return res
        .status(404)
        .json({ message: `No feedback found for this ${entity}` })
    }

    const comments = feedbacks.map((feedback) =>
      feedback[entity]
        .filter((item) => item[`${entity}_id`].toString() === entity_id)
        .map((item) => ({
          ...item.toObject(),
          user: feedback.user_id
        }))
    )

    const allComments = comments.flat()

    return res.status(200).json({
      message: `${
        entity.charAt(0).toUpperCase() + entity.slice(1)
      } comments fetched successfully`,
      comments: allComments
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error while fetching comments', error: error.message })
  }
}

module.exports = {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getCommentsByEntity
}
