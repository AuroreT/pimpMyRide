'use strict';
var Promise = require('bluebird');
var Scooters = Promise.promisifyAll(require('../database/scooters'));

exports.findOneByQuery = function(query) {
    return Scooters.findOneAsync(query);
};

exports.findAll = function() {
    return Scooters.findAsync();
};

exports.findWhereIdIn = function(array) {
    return Scooters.find({
        '_id': { $in: array}
    });
};

exports.findLastScooters = function() {
    //return Scooters.findAsync();
    return Scooters.find().sort({createdAt: -1}).limit(3);
};

exports.createScooter = function(scooter) {
    return Scooters.createAsync(scooter);
};

exports.updateScooterById = function(scooterId, scooterToUpdate) {
    return Scooters.findOneAndUpdateAsync({_id: scooterId}, scooterToUpdate, {new: true});
};

exports.updateScooterByArduinoId = function(arduinoId, scooterToUpdate) {
    return Scooters.findOneAndUpdateAsync({arduinoID: arduinoId}, scooterToUpdate, {new: true});
};

exports.delete = function(query) {
    return Scooters.removeAsync(query);
};