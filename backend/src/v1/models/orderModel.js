const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Booking'
    },
    transaction_code: {
      type: String,
      required: true,
      unique: true
    },
    items: {
      type: Array,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    payment_method: {
      type: String,
      required: true
    },
    payment_status: {
      type: String,
      default: 'Success',
      enum: ['Failed', 'Success']
    },
    transaction_date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Transaction', transactionSchema)
