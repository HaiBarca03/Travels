const express = require('express')
const {
    createTouristAttraction,
    getTouristAttractionsByLocation,
    getAllTouristAttractions,
    getTouristAttractionById,
    getRestaurantsByTouristLocation,
    getAccommodationByTouristLocation,
    updateTouristAttraction,
    deleteTouristAttraction
} = require('../controller/touristAttractionController')
const { isAdmin } = require('../middleware/auth')
const { uploadImages } = require('../utils/uploadCloudinary')

const touristAttractionRouter = express.Router()
touristAttractionRouter.post('/add-tourist', isAdmin, uploadImages, createTouristAttraction)
touristAttractionRouter.get('/get-by-location/:locationId', getTouristAttractionsByLocation)
touristAttractionRouter.get('/get-all-tourist', getAllTouristAttractions)
touristAttractionRouter.get('/get-detail-tourist/:id', getTouristAttractionById)
touristAttractionRouter.get('/:id/restaurants', getRestaurantsByTouristLocation)
// touristAttractionRouter.get('/tourist-attractions/:id/accommodation', getAccommodationByTouristLocation)
touristAttractionRouter.get('/:id/accommodation', getAccommodationByTouristLocation)
touristAttractionRouter.put('/update-tourist/:touristAttractionId', isAdmin, uploadImages, updateTouristAttraction)
touristAttractionRouter.delete('/delete-tourist/:touristAttractionId', isAdmin, uploadImages, deleteTouristAttraction)

module.exports = touristAttractionRouter;