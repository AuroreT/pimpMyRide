"use strict";
var _ = require('lodash');
var express = require('express');
var router = express.Router();
var UserService = require('../services/users');
var Promise = require('bluebird');
var Users = Promise.promisifyAll(require('../database/users'));
var bcrypt = require('bcrypt');
var passport = require('passport');

var bodyVerificator = function(req, res, next) {
    var attributes = _.keys(req.body);
    var mandatoryAttributes = ['username', 'password'];
    var missingAttributes = _.difference(mandatoryAttributes, attributes);
    if (missingAttributes.length) {
        res.status(400).send({err: missingAttributes.toString()});
    }
    else {
        if (req.body.username && req.body.password) {
            next();
        }
        else {
            var error = mandatoryAttributes.toString() + ' are mandatory';
            res.status(400).send({err: error});
        }
    }
};

router.post('/', bodyVerificator, function(req, res) {
    UserService.findSelectPassword(req.body.username).then(function(user){

        if (!user) {
            return res.status(404).send({err: 'No matching user'});
        }


        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(404).send({err: 'No matching user'});
        }

        user.setToken().then(function(user){
            return res.status(200).send({token: user.token});
        });

    });
});

//router.post('/', passport.authenticate('token', {
//        successRedirect: '/users',
//        failureRedirect: '/'
//    })
//);

//router.post('/', function(req, res) {
//
//        res.status(200).send({'page': 'index'});
//}
//);


module.exports = router;