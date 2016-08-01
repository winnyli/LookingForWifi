var mongoose = require('mongoose');
require('./users.js')
var Schema = mongoose.Schema;
var User = mongoose.model('User')

var reviewSchema = new mongoose.Schema({
    author: {
        type:　String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type:　String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});

var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    // Always store coordinates longitude, latitude order.
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema],
    _user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    
});

mongoose.model('Location', locationSchema);

