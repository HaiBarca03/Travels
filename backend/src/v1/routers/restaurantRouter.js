const express = require('express')
const {
    createRestaurants,
    updateRestaurant,
    getRestaurantByLocation,
    getAllRestaurant,
    deleteRestaurant
} = require('../controller/restaurantController')
const { isAdmin } = require('../middleware/auth')
const { uploadImages } = require('../utils/uploadCloudinary')

const restaurantRouter = express.Router();
restaurantRouter.post('/create-restaurant', isAdmin, uploadImages, createRestaurants)
restaurantRouter.put('/update-restaurant/:restaurantId', isAdmin, uploadImages, updateRestaurant)
restaurantRouter.get('/get-by-location', getRestaurantByLocation)
restaurantRouter.get('/get-all-restaurant', getAllRestaurant)
restaurantRouter.delete('/delete-restaurant/:id', isAdmin, uploadImages, deleteRestaurant)

module.exports = restaurantRouter