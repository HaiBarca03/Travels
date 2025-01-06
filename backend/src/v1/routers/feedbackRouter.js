const express = require('express')
const {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getCommentsByEntity
} = require('../controller/feedbackController')
const { authorizeUser, isAdminUser } = require('../middleware/auth')
const feedbackRouter = express.Router()

feedbackRouter.post('/', authorizeUser, createFeedback)
feedbackRouter.put('/', authorizeUser, updateFeedback)
feedbackRouter.delete('/', authorizeUser, deleteFeedback)
feedbackRouter.get('/:entity/:entity_id', getCommentsByEntity)

module.exports = feedbackRouter
