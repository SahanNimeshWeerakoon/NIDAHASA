const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    likes_count: {
        type: Number
    },
    user_id: {
        type: Number,
        required: true
    },
    shared_count: {
        type: Number
    },
    images: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// module.exports = Place = mongoose.model('place', PlaceSchema);
module.exports = mongoose.model('Place', PlaceSchema);