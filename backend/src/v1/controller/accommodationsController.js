const mongoose = require('mongoose')
const Accommodations = require('../models/accommodationsModel')
const cloudinary = require('cloudinary')
const fs = require('fs')
const featuresApp = require('../utils/features')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const createAccommodation = async (req, res) => {
  try {
    const {
      name,
      address,
      location,
      type,
      price,
      amenities,
      rating,
      reviews,
      description
    } = req.body

    let imagesLinks = []

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'accommodation'
        })

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url
        })

        fs.unlinkSync(file.path)
      }
    }

    const newAccommodation = new Accommodations({
      name,
      description,
      address,
      location,
      type,
      price,
      amenities,
      images: imagesLinks,
      rating: rating || 1,
      reviews
    })

    const savedAccommodation = await newAccommodation.save()
    res.status(201).json({
      success: true,
      data: savedAccommodation,
      message: 'Created successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const updateAccommodation = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      location,
      type,
      price,
      amenities,
      rating,
      reviews,
      deleteImages
    } = req.body
    const accommodationId = req.params.accommodationId

    const accommodation = await Accommodations.findById(accommodationId)
    if (!accommodation) {
      return res
        .status(404)
        .json({ success: false, message: 'Accommodation not found' })
    }

    if (deleteImages && deleteImages.length > 0) {
      for (const public_id of deleteImages) {
        await cloudinary.uploader.destroy(public_id)
        accommodation.images = accommodation.images.filter(
          (img) => img.public_id !== public_id
        )
      }
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'accommodation'
        })

        accommodation.images.push({
          public_id: result.public_id,
          url: result.secure_url
        })

        fs.unlinkSync(file.path)
      }
    }

    accommodation.name = name || accommodation.name
    accommodation.description = description || accommodation.description
    accommodation.address = address || accommodation.address
    accommodation.location = location || accommodation.location
    accommodation.type = type || accommodation.type
    accommodation.price = price || accommodation.price
    accommodation.amenities = amenities || accommodation.amenities
    accommodation.rating = rating || accommodation.rating
    accommodation.reviews = reviews || accommodation.reviews

    const updatedAccommodation = await accommodation.save()

    res.status(200).json({
      success: true,
      data: updatedAccommodation,
      message: 'Accommodation updated successfully'
    })
  } catch (error) {
    console.error('Error updating accommodation:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getAccommodationsByLocation = async (req, res) => {
  try {
    const resultPerPage = 10
    const { locationId } = req.params

    const features = new featuresApp(
      Accommodations.find({ location: locationId }).populate('location'),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage)

    const accommodations = await features.query

    if (!accommodations || accommodations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No accommodations found for this location'
      })
    }

    res.status(200).json({
      success: true,
      results: accommodations.length,
      data: accommodations,
      currentPage: req.query.page || 1,
      totalTours: await Accommodations.countDocuments()
    })
  } catch (error) {
    console.error('Error fetching accommodations by location:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getAccommodationDetail = async (req, res) => {
  try {
    const { id } = req.params
    console.log('id', id)

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Accommodation ID is required'
      })
    }

    const accommodations = await Accommodations.findById(id).populate(
      'location'
    )

    if (!accommodations) {
      return res.status(404).json({
        success: false,
        message: 'No accommodations found'
      })
    }

    res.status(200).json({
      success: true,
      data: accommodations
    })
  } catch (error) {
    console.error('Error fetching accommodations by ID:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getAllAccommodations = async (req, res) => {
  try {
    const resultPerPage = 10
    const features = new featuresApp(
      Accommodations.find().populate('location'),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage)

    const accommodations = await features.query

    if (!accommodations || accommodations.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No accommodations found' })
    }

    res.status(200).json({
      success: true,
      results: accommodations.length,
      data: accommodations,
      currentPage: req.query.page || 1,
      totalTours: await Accommodations.countDocuments()
    })
  } catch (error) {
    console.error('Error fetching accommodations:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const deleteAccommodation = async (req, res) => {
  try {
    const { id } = req.params

    const accommodation = await Accommodations.findById(id)
    if (!accommodation) {
      return res
        .status(404)
        .json({ success: false, message: 'Accommodation not found' })
    }

    if (accommodation.images && accommodation.images.length > 0) {
      for (const image of accommodation.images) {
        await cloudinary.uploader.destroy(image.public_id)
      }
    }

    await Accommodations.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: 'Accommodation deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting accommodation:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = {
  createAccommodation,
  updateAccommodation,
  getAccommodationsByLocation,
  getAllAccommodations,
  deleteAccommodation,
  getAccommodationDetail
}
