const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    list_tour: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tours',
        required: false
      }
    ],
    list_tourist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TouristAttraction',
        required: false
      }
    ],
    list_restaurant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
        required: false
      }
    ],
    list_accommodations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accommodations',
        required: false
      }
    ],
    list_location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: false
      }
    ],
    date_added: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Favorite', favoriteSchema)
