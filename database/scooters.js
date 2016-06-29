'use strict';
var mongoose = require('mongoose');

var scooterSchema = mongoose.Schema({
    name: {type: String, required: true},
    lat: Number,
    lng: Number,
    phone: Number,
    temperature: Number,
    humidity: Number,
    speed: Number,
    owner_id: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('scooter', scooterSchema);