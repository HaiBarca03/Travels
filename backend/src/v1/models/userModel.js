const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'vendor'],
      default: 'customer'
    },
    addresses: {
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
    },
    booked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
      }
    ],
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorites'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Users', userSchema)
