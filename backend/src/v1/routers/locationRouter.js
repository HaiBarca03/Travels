const express = require('express')
const {
    createLocation,
    getAllLocations,
    updateLocation,
    deleteLocation,
    getLocationsByCountry,
} = require('../controller/locationController')
const { authorizeUser, isAdminUser, isAdmin } = require('../middleware/auth')
const { uploadAvatar } = require('../utils/uploadCloudinary')
const locationRouter = express.Router();

locationRouter.post('/add-location', isAdmin, uploadAvatar, createLocation)
locationRouter.get('/get-all-locations', getAllLocations);
locationRouter.get('/get-by-country', getLocationsByCountry);
locationRouter.put('/update-location/:locationId', isAdmin, uploadAvatar, updateLocation);
locationRouter.delete('/delete-locations/:locationId', isAdmin, deleteLocation);

module.exports = locationRouter;