const TouristAttraction = require('../models/touristAttractionModel')
const Restaurant = require('../models/restaurantModel')
const Accommodation = require('../models/accommodationsModel')
const cloudinary = require('cloudinary')
const fs = require('fs')
const featuresApp = require('../utils/features')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const createTouristAttraction = async (req, res) => {
  try {
    const { name, description, location, activities, rating, price, reviews } =
      req.body

    let imagesLinks = []

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'touristAttractions'
        })

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url
        })

        fs.unlinkSync(file.path)
      }
    }

    const newTouristAttraction = new TouristAttraction({
      name,
      description,
      location,
      images: imagesLinks,
      activities,
      price,
      rating: rating || 1,
      reviews
    })

    const savedAttraction = await newTouristAttraction.save()

    res.status(201).json({
      success: true,
      data: savedAttraction,
      message: 'Tourist attraction created successfully'
    })
  } catch (error) {
    console.error('Error creating tourist attraction:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getTouristAttractionsByLocation = async (req, res) => {
  try {
    const { locationId } = req.params
    const resultPerPage = 10

    const features = new featuresApp(
      TouristAttraction.find({ location: locationId }).populate(
        'location',
        'country provinceCity'
      ),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage)

    const attractions = await features.query

    if (!attractions.length) {
      return res.status(404).json({
        success: false,
        message: 'No tourist attractions found for this location'
      })
    }

    res.status(200).json({
      success: true,
      results: attractions.length,
      data: attractions,
      currentPage: req.query.page || 1,
      totalTours: await TouristAttraction.countDocuments(),
      message: 'Tourist attractions fetched successfully'
    })
  } catch (error) {
    console.error('Error fetching tourist attractions by location:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getAllTouristAttractions = async (req, res) => {
  try {
    const resultPerPage = 100

    const features = new featuresApp(
      TouristAttraction.find().populate('location', 'country provinceCity'),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage)

    const attractions = await features.query

    if (!attractions.length) {
      return res.status(404).json({
        success: false,
        message: 'No tourist attractions found'
      })
    }

    res.status(200).json({
      success: true,
      results: attractions.length,
      data: attractions,
      currentPage: req.query.page || 1,
      totalTours: await TouristAttraction.countDocuments(),
      message: 'Tourist attractions fetched successfully'
    })
  } catch (error) {
    console.error('Error fetching all tourist attractions:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getAllTouristAttractionsHome = async (req, res) => {
  try {
    const resultPerPage = 4

    const features = new featuresApp(
      TouristAttraction.find().populate('location', 'country provinceCity'),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage)

    const attractions = await features.query

    if (!attractions.length) {
      return res.status(404).json({
        success: false,
        message: 'No tourist attractions found'
      })
    }

    res.status(200).json({
      success: true,
      results: attractions.length,
      data: attractions,
      currentPage: req.query.page || 1,
      totalTours: await TouristAttraction.countDocuments(),
      message: 'Tourist attractions fetched successfully'
    })
  } catch (error) {
    console.error('Error fetching all tourist attractions:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getTouristAttractionById = async (req, res) => {
  try {
    const { id } = req.params

    const attraction = await TouristAttraction.findById(id).populate(
      'location',
      'country provinceCity'
    )
    //.populate('reviews');

    if (!attraction) {
      return res.status(404).json({
        success: false,
        message: 'Tourist attraction not found'
      })
    }

    res.status(200).json({
      success: true,
      data: attraction,
      message: 'Tourist attraction details fetched successfully'
    })
  } catch (error) {
    console.error('Error fetching tourist attraction details:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const updateTouristAttraction = async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      activities,
      rating,
      price,
      deleteImages
    } = req.body
    const touristAttractionId = req.params.touristAttractionId

    const attraction = await TouristAttraction.findById(touristAttractionId)
    if (!attraction) {
      return res
        .status(404)
        .json({ success: false, message: 'restaurant not found' })
    }

    if (deleteImages && deleteImages.length > 0) {
      for (const public_id of deleteImages) {
        await cloudinary.uploader.destroy(public_id)
        attraction.images = attraction.images.filter(
          (img) => img.public_id !== public_id
        )
      }
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'touristAttractions'
        })

        attraction.images.push({
          public_id: result.public_id,
          url: result.secure_url
        })

        fs.unlinkSync(file.path)
      }
    }

    attraction.name = name || attraction.name
    attraction.description = description || attraction.description
    attraction.location = location || attraction.location
    attraction.activities = activities || attraction.activities
    attraction.price = price || attraction.price
    attraction.rating = rating || attraction.rating

    const updatedAttraction = await attraction.save()

    res.status(200).json({
      success: true,
      data: updatedAttraction,
      message: 'attraction updated successfully'
    })
  } catch (error) {
    console.error('Error updating attraction:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const deleteTouristAttraction = async (req, res) => {
  try {
    const { touristAttractionId } = req.params
    const attraction = await TouristAttraction.findById(touristAttractionId)

    if (!attraction) {
      return res.status(404).json({
        success: false,
        message: 'Tourist attraction not found'
      })
    }

    if (attraction.images.length > 0) {
      for (const image of attraction.images) {
        await cloudinary.uploader.destroy(image.public_id)
      }
    }

    await attraction.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Tourist attraction deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting tourist attraction:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = {
  createTouristAttraction,
  getTouristAttractionsByLocation,
  getAllTouristAttractions,
  getTouristAttractionById,
  updateTouristAttraction,
  deleteTouristAttraction,
  getAllTouristAttractionsHome
}
