'use strict';
var mongoose = require('mongoose');

var scooterSchema = mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number,
    phone: Number,
    temperature: Number,
    speed: Number
});

module.exports = mongoose.model('scooter', scooterSchema);