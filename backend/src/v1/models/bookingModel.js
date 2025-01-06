const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    tour_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tours',
      required: false
    },
    tourist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TouristAttraction',
      required: false
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurants',
      required: false
    },
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accommodations',
      required: false
    },
    groupAdultInformation: [
      {
        name: {
          type: String,
          required: true
        },
        gender: {
          type: String,
          enum: ['male', 'female'],
          required: true
        },
        birth: {
          type: Date,
          required: true
        }
      }
    ],
    groupChildrenInformation: [
      {
        name: {
          type: String,
          required: false
        },
        gender: {
          type: String,
          enum: ['male', 'female'],
          required: false
        },
        birth: {
          type: Date,
          required: false
        }
      }
    ],
    payment_method: {
      type: String,
      enum: [
        'momo',
        'credit_card',
        'paypal',
        'zalo_pay',
        'cash',
        'bank',
        'vn_pay'
      ],
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
      required: true
    },
    booking_date: {
      type: Date,
      default: Date.now,
      required: true
    },
    status: {
      type: String,
      enum: ['partially_refunded', 'paid', 'refunded', 'pending', 'cancel'],
      default: 'pending',
      required: true
    },
    total_cost: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Booking', BookingSchema)
