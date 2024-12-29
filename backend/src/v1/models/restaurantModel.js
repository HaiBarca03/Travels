const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    decription: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true,
      trim: true
    },
    images: [
      {
        public_id: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Restaurants', restaurantSchema)
