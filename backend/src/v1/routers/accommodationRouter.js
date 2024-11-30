const express = require('express')
const {
    createAccommodation,
    updateAccommodation,
    getAccommodationsByLocation,
    getAllAccommodations,
    deleteAccommodation,
    getAccommodationDetail
} = require('../controller/accommodationsController')
const { isAdmin } = require('../middleware/auth')
const { uploadImages } = require('../utils/uploadCloudinary')

const accommodationRouter = express.Router();
accommodationRouter.post('/create-accommodation', isAdmin, uploadImages, createAccommodation)
accommodationRouter.put('/update-accommodation/:accommodationId', isAdmin, uploadImages, updateAccommodation)
accommodationRouter.get('/get-by-location/:locationId', getAccommodationsByLocation)
accommodationRouter.get('/get-detail-accommodation/:id', getAccommodationDetail)
accommodationRouter.get('/get-all-accommodation', getAllAccommodations)
accommodationRouter.delete('/delete-accommodation/:id', isAdmin, uploadImages, deleteAccommodation)

module.exports = accommodationRouter