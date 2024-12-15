const express = require('express')
const {
    createTour,
    getDetailTour,
    getAllTours,
    updateTour,
    deleteTour
} = require('../controller/tourController')
const { authorizeUser, isAdminUser, isAdmin } = require('../middleware/auth')

const tourRouter = express.Router()
tourRouter.post('/create-tour', createTour)
tourRouter.get('/tour-detail/:id', getDetailTour)
tourRouter.get('/all-tour', getAllTours)
tourRouter.put('/update-tour/:id', isAdmin, updateTour)
tourRouter.delete('/delete-tour/:id', isAdmin, deleteTour)

module.exports = tourRouter