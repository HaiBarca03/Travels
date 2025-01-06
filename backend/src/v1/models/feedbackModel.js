const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    tour: [
      {
        tour_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Tours',
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          default: 0
        },
        like: {
          type: Number,
          default: 0
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    tourist: [
      {
        tourist_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'TouristAttraction',
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          default: 0
        },
        like: {
          type: Number,
          default: 0
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    hotel: [
      {
        hotel_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Accommodations',
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          default: 0
        },
        like: {
          type: Number,
          default: 0
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    restaurant: [
      {
        restaurant_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Restaurants',
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          default: 0
        },
        like: {
          type: Number,
          default: 0
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Feedback', FeedbackSchema)
