const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tourSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    tour_places: [{ type: Schema.Types.ObjectId, ref: 'TouristAttraction' }],
    description: { type: String, required: true },
    activities: [{ type: String }],
    price: { type: Number, required: true },
    start_date: { type: Date, required: true },
    place_departure: { type: String, required: true },
    time: { type: String, required: true },
    max_participants: { type: Number, required: true },
    current_participants: { type: Number, default: 0 },
    guide_id: { type: Schema.Types.ObjectId, ref: 'Guide', required: true },
    rating: { type: Number, default: 0 },
    reviews: [{ type: String }]
  },
  {
    timestamps: true
  }
)

const Tour = mongoose.model('Tours', tourSchema)

module.exports = Tour
