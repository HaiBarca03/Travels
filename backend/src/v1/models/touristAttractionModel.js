const mongoose = require('mongoose')

const touristAttractionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    price: {
      type: String
      //required: true,
      //trim: true
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
    activities: {
      type: [String],
      default: []
    },
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

module.exports = mongoose.model('TouristAttraction', touristAttractionSchema)
