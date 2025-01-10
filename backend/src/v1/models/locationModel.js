const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true
    },
    provinceCity: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      public_id: {
        type: String
      },
      url: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Location', locationSchema)
