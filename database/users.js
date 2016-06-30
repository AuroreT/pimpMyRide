'use strict';
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true, select: false},
    displayName: {type: String, required: true},
    email: {type: String, required: true},
    createdAt: {type: Date, 'default': Date.now},
    scooters: [mongoose.Schema.Types.ObjectId],
    isUsed: {type: Boolean, default: false}
});

UserSchema.plugin(require('mongoose-token'), {
    tokenPath   : 'token',
    expiresPath : 'tokenExpires',
    setMethod   : 'setToken',
    getByMethod : 'getByToken',
    resetMethod : 'resetToken',
    tokenLength : 20,
    expire      : 24 * 60 * 60 * 1000 // 24 hour
});

module.exports = mongoose.model('user', UserSchema);