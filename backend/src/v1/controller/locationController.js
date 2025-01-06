const LocationModel = require('../models/locationModel')
const cloudinary = require('cloudinary')
const fs = require('fs')
const featuresApp = require('../utils/features')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const createLocation = async (req, res) => {
  try {
    const { country, provinceCity } = req.body
    let imagesLinks = []

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Home/local'
      })

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url
      })

      fs.unlinkSync(req.file.path)
    }

    const newLocation = new LocationModel({
      country,
      provinceCity,
      avatar: imagesLinks[0]
    })

    const savedLocation = await newLocation.save()

    res.json({
      success: true,
      data: savedLocation,
      message: 'Location created successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Error creating location'
    })
  }
}

const getAllLocations = async (req, res) => {
  try {
    const resultPerPage = 10

    const features = new featuresApp(LocationModel.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage)

    const locations = await features.query

    if (!locations || locations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No locations found'
      })
    }

    res.status(200).json({
      success: true,
      results: locations.length,
      data: locations,
      currentPage: req.query.page || 1,
      totalTours: await LocationModel.countDocuments(),
      message: 'Fetched all locations successfully'
    })
  } catch (error) {
    console.error('Error fetching locations:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching locations'
    })
  }
}

const updateLocation = async (req, res) => {
  try {
    const { locationId } = req.params
    const { country, provinceCity } = req.body

    const checkLocal = await LocationModel.findById(locationId)

    if (!checkLocal) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      })
    }

    let updatedAvatar = checkLocal.avatar
    if (req.file) {
      if (checkLocal.avatar?.public_id) {
        await cloudinary.uploader.destroy(checkLocal.avatar.public_id)
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Home/local'
      })

      updatedAvatar = {
        public_id: result.public_id,
        url: result.secure_url
      }

      fs.unlinkSync(req.file.path)
    }

    const updatedLocation = await LocationModel.findByIdAndUpdate(
      locationId,
      {
        country,
        provinceCity,
        avatar: updatedAvatar
      },
      { new: true, runValidators: true }
    )

    res.json({
      success: true,
      data: updatedLocation,
      message: 'Location updated successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Error updating location'
    })
  }
}

const deleteLocation = async (req, res) => {
  const { locationId } = req.params

  try {
    if (!locationId) {
      return res.status(404).json({
        success: false,
        message: 'LocationID fail'
      })
    }
    const deletedLocation = await LocationModel.findByIdAndDelete(locationId)

    if (!deletedLocation) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      })
    }

    res.json({
      success: true,
      data: deletedLocation,
      message: 'Location deleted successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Error deleting location'
    })
  }
}

const getLocationsByCountry = async (req, res) => {
  const { country } = req.body

  try {
    const locations = await LocationModel.find({ country })

    if (locations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No locations found for the specified country'
      })
    }

    res.json({
      success: true,
      data: locations
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Error retrieving locations'
    })
  }
}

module.exports = {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
  getLocationsByCountry
}
