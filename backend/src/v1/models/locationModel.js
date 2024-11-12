const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },
    provinceCity: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Location', locationSchema);