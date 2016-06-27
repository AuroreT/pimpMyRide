'use strict';
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true, select: false},
    displayName: {type: String, required: true},
    email: {type: String, required: true},
    createdAt: {type: Date, 'default': Date.now},
    scooters: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('user', userSchema);