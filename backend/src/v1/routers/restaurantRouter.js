const express = require('express')
const {
    createRestaurants,
    updateRestaurant,
    getRestaurantByLocation,
    getAllRestaurant,
    deleteRestaurant,
    getDetailRes
} = require('../controller/restaurantController')
const { isAdmin } = require('../middleware/auth')
const { uploadImages } = require('../utils/uploadCloudinary')

const restaurantRouter = express.Router();
restaurantRouter.post('/create-restaurant', isAdmin, uploadImages, createRestaurants)
restaurantRouter.put('/update-restaurant/:restaurantId', isAdmin, uploadImages, updateRestaurant)
restaurantRouter.get('/get-by-location/:locationId', getRestaurantByLocation)
restaurantRouter.get('/get-by-id/:restaurantId', getDetailRes)
restaurantRouter.get('/get-all-restaurant', getAllRestaurant)
restaurantRouter.delete('/delete-restaurant/:id', isAdmin, uploadImages, deleteRestaurant)

module.exports = restaurantRouter