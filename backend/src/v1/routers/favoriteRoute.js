const express = require('express')
const {
  getFavoriteByUser,
  addToFavorite,
  deleteFromFavorite
} = require('../controller/favorite.controller')
const { authorizeUser } = require('../middleware/auth')
const favoriteRouter = express.Router()

favoriteRouter.get('/favorites-by-user', authorizeUser, getFavoriteByUser)
favoriteRouter.post('/add-favorites', authorizeUser, addToFavorite)
favoriteRouter.delete('/delete-favorites', authorizeUser, deleteFromFavorite)

module.exports = favoriteRouter
