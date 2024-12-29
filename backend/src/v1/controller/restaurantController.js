const Restaurants = require('../models/restaurantModel')
const cloudinary = require('cloudinary')
const fs = require('fs')
const featuresApp = require('../utils/features')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const createRestaurants = async (req, res) => {
  try {
    const {
      name,
      address,
      location,
      type,
      price,
      rating,
      reviews,
      decription
    } = req.body

    let imagesLinks = []

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'restaurants'
        })

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url
        })

        fs.unlinkSync(file.path)
      }
    }

    const newRestaurant = new Restaurants({
      name,
      address,
      decription,
      location,
      type,
      price,
      images: imagesLinks,
      rating: rating || 1,
      reviews
    })

    const savedRestaurant = await newRestaurant.save()
    res.status(201).json({
      success: true,
      data: savedRestaurant,
      message: 'Created successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const updateRestaurant = async (req, res) => {
  try {
    const {
      name,
      address,
      location,
      type,
      price,
      decription,
      rating,
      reviews,
      deleteImages
    } = req.body
    const restaurantId = req.params.restaurantId

    const restaurant = await Restaurants.findById(restaurantId)
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: 'restaurant not found' })
    }

    if (deleteImages && deleteImages.length > 0) {
      for (const public_id of deleteImages) {
        await cloudinary.uploader.destroy(public_id)
        restaurant.images = restaurant.images.filter(
          (img) => img.public_id !== public_id
        )
      }
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'restaurant'
        })

        restaurant.images.push({
          public_id: result.public_id,
          url: result.secure_url
        })

        fs.unlinkSync(file.path)
      }
    }

    restaurant.name = name || restaurant.name
    restaurant.decription = decription || restaurant.decription
    restaurant.address = address || restaurant.address
    restaurant.location = location || restaurant.location
    restaurant.type = type || restaurant.type
    restaurant.price = price || restaurant.price
    restaurant.rating = rating || restaurant.rating
    restaurant.reviews = reviews || restaurant.reviews

    const updatedRestaurant = await restaurant.save()

    res.status(200).json({
      success: true,
      data: updatedRestaurant,
      message: 'restaurant updated successfully'
    })
  } catch (error) {
    console.error('Error updating restaurant:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getRestaurantByLocation = async (req, res) => {
  try {
    const { locationId } = req.params
    const resultPerPage = 10
    const features = new featuresApp(
      Restaurants.find({ location: locationId }).populate('location'),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage)

    const restaurants = await features.query

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No restaurant found for this location'
      })
    }

    res.status(200).json({
      success: true,
      results: restaurants.length,
      data: restaurants,
      currentPage: req.query.page || 1,
      totalTours: await Restaurants.countDocuments(),
      message: 'Fetched restaurants by location successfully'
    })
  } catch (error) {
    console.error('Error fetching restaurants by location:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

const getAllRestaurant = async (req, res) => {
  try {
    const resultPerPage = 10

    const features = new featuresApp(
      Restaurants.find().populate('location'),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage)

    const restaurants = await features.query

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No restaurants found'
      })
    }

    res.status(200).json({
      success: true,
      results: restaurants.length,
      data: restaurants,
      currentPage: req.query.page || 1,
      totalTours: await Restaurants.countDocuments(),
      message: 'Fetched all restaurants successfully'
    })
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

const getDetailRes = async (req, res) => {
  const { restaurantId } = req.params
  try {
    const restaurant = await Restaurants.findById(restaurantId).populate(
      'location'
    )
    if (!restaurant || restaurant.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No restaurant found' })
    }

    res.status(200).json({
      success: true,
      data: restaurant
    })
  } catch (error) {
    console.error('Error fetching restaurant:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params

    const restaurant = await Restaurants.findById(id)
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: 'restaurant not found' })
    }

    if (restaurant.images && restaurant.images.length > 0) {
      for (const image of restaurant.images) {
        await cloudinary.uploader.destroy(image.public_id)
      }
    }

    await Restaurants.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: 'restaurant deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting restaurant:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = {
  createRestaurants,
  updateRestaurant,
  getRestaurantByLocation,
  getAllRestaurant,
  getDetailRes,
  deleteRestaurant
}
