const { default: mongoose } = require('mongoose')
const favoriteModel = require('../models/favoriteModel')
const restaurantModel = require('../models/restaurantModel')
const Tour = require('../models/tourModel')
const touristAttractionModel = require('../models/touristAttractionModel')
const accommodationsModel = require('../models/accommodationsModel')
const locationModel = require('../models/locationModel')

const getFavoriteByUser = async (req, res) => {
  const userId = req.user._id

  try {
    const favorite = await favoriteModel
      .findOne({ user_id: userId })
      .populate('list_tour')
      .populate('list_tourist')
      .populate('list_restaurant')
      .populate('list_accommodations')
      .populate('list_location')

    if (!favorite) {
      return res
        .status(404)
        .json({ success: false, message: 'Favorite not found' })
    }

    res.status(200).json({ success: true, favorite })
  } catch (error) {
    console.error('Error fetching favorite:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const addToFavorite = async (req, res) => {
  try {
    const userId = req.user._id
    const { restaurantId, tourId, touristId, accommodationId, locationId } =
      req.body
    const favorite = await favoriteModel.findOne({ user_id: userId })

    const validateId = async (id, idName, model) => {
      if (id && id.trim() !== '') {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return {
            success: false,
            message: `Invalid ${idName}`
          }
        }

        const exists = await model.findById(id)
        if (!exists) {
          return {
            success: false,
            message: `${idName} does not exist`
          }
        }
      }
      return null
    }

    const idsToValidate = [
      { id: restaurantId, name: 'Restaurant ID', model: restaurantModel },
      { id: tourId, name: 'Tour ID', model: Tour },
      { id: touristId, name: 'Tourist ID', model: touristAttractionModel },
      {
        id: accommodationId,
        name: 'Accommodation ID',
        model: accommodationsModel
      },
      { id: locationId, name: 'Location ID', model: locationModel }
    ]

    for (const { id, name, model } of idsToValidate) {
      const validationError = await validateId(id, name, model)
      if (validationError) {
        return res.status(400).json(validationError)
      }
    }

    if (!favorite) {
      const newFavorite = new favoriteModel({
        user_id: userId,
        list_restaurant: restaurantId ? [restaurantId] : [],
        list_tour: tourId ? [tourId] : [],
        list_tourist: touristId ? [touristId] : [],
        list_accommodations: accommodationId ? [accommodationId] : [],
        list_location: locationId ? [locationId] : []
      })
      await newFavorite.save()
      return res.status(200).json({
        success: true,
        message: 'Added to favorites',
        favorite: newFavorite
      })
    }

    let updated = false
    if (restaurantId && !favorite.list_restaurant.includes(restaurantId)) {
      favorite.list_restaurant.push(restaurantId)
      updated = true
    }
    if (tourId && !favorite.list_tour.includes(tourId)) {
      favorite.list_tour.push(tourId)
      updated = true
    }
    if (touristId && !favorite.list_tourist.includes(touristId)) {
      favorite.list_tourist.push(touristId)
      updated = true
    }
    if (
      accommodationId &&
      !favorite.list_accommodations.includes(accommodationId)
    ) {
      favorite.list_accommodations.push(accommodationId)
      updated = true
    }
    if (locationId && !favorite.list_location.includes(locationId)) {
      favorite.list_location.push(locationId)
      updated = true
    }

    if (updated) {
      await favorite.save()
      return res.status(200).json({
        success: true,
        message: 'Favorite updated',
        favorite
      })
    }

    return res.status(400).json({
      success: false,
      message: 'No new favorite items were added'
    })
  } catch (error) {
    console.error('Error adding to favorite:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const deleteFromFavorite = async (req, res) => {
  try {
    const userId = req.user._id
    const { restaurantId, tourId, touristId, accommodationId, locationId } =
      req.body
    const favorite = await favoriteModel.findOne({ user_id: userId })

    const validateId = async (id, idName, model) => {
      if (id && id.trim() !== '') {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return {
            success: false,
            message: `Invalid ${idName}`
          }
        }
      }
      return null
    }

    const idsToValidate = [
      { id: restaurantId, name: 'Restaurant ID' },
      { id: tourId, name: 'Tour ID' },
      { id: touristId, name: 'Tourist ID' },
      {
        id: accommodationId,
        name: 'Accommodation ID'
      },
      { id: locationId, name: 'Location ID' }
    ]

    for (const { id, name } of idsToValidate) {
      const validationError = await validateId(id, name)
      if (validationError) {
        return res.status(400).json(validationError)
      }
    }

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'No favorite items found'
      })
    }

    let updated = false

    if (restaurantId && favorite.list_restaurant.includes(restaurantId)) {
      favorite.list_restaurant = favorite.list_restaurant.filter(
        (id) => id.toString() !== restaurantId
      )
      updated = true
    } else if (restaurantId) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant ID is not in your favorites'
      })
    }

    if (tourId && favorite.list_tour.includes(tourId)) {
      favorite.list_tour = favorite.list_tour.filter(
        (id) => id.toString() !== tourId
      )
      updated = true
    } else if (tourId) {
      return res.status(400).json({
        success: false,
        message: 'Tour ID is not in your favorites'
      })
    }

    if (touristId && favorite.list_tourist.includes(touristId)) {
      favorite.list_tourist = favorite.list_tourist.filter(
        (id) => id.toString() !== touristId
      )
      updated = true
    } else if (touristId) {
      return res.status(400).json({
        success: false,
        message: 'Tourist ID is not in your favorites'
      })
    }

    if (
      accommodationId &&
      favorite.list_accommodations.includes(accommodationId)
    ) {
      favorite.list_accommodations = favorite.list_accommodations.filter(
        (id) => id.toString() !== accommodationId
      )
      updated = true
    } else if (accommodationId) {
      return res.status(400).json({
        success: false,
        message: 'Accommodation ID is not in your favorites'
      })
    }

    if (locationId && favorite.list_location.includes(locationId)) {
      favorite.list_location = favorite.list_location.filter(
        (id) => id.toString() !== locationId
      )
      updated = true
    } else if (locationId) {
      return res.status(400).json({
        success: false,
        message: 'Location ID is not in your favorites'
      })
    }

    if (updated) {
      await favorite.save()
      return res.status(200).json({
        success: true,
        message: 'Favorite updated',
        favorite
      })
    }

    return res.status(400).json({
      success: false,
      message: 'No items were removed from favorites'
    })
  } catch (error) {
    console.error('Error deleting from favorite:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = { getFavoriteByUser, addToFavorite, deleteFromFavorite }
