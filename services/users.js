'use strict';
var Promise = require('bluebird');
var Users = Promise.promisifyAll(require('../database/users'));

exports.findOneByQuery = function(query) {
    console.log(query);
    return Users.findOneAsync(query);
};

exports.findAll = function() {
    return Users.findAsync();
};

exports.findWhereIdIn = function(array) {
    return Users.find({
        '_id': { $in: array}
    });
};

exports.findLastUsers = function() {
    //return Users.findAsync();
    return Users.find().sort({createdAt: -1}).limit(3);
};

exports.createUser = function(user) {
    return Users.createAsync(user);
};
