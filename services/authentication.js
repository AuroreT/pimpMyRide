'use strict';

var UniqueTokenStrategy = require('passport-unique-token').Strategy;
var User = require('../database/users');
var strategyOptions = {
    tokenField:     'token',
    tokenHeader:     'token',
    failedOnMissing: false
};

module.exports.tokenStrategy = function() {
    return new UniqueTokenStrategy(strategyOptions,
        function (token, done) {
            User.findOne({ token: token, tokenExpires: { $gt: Date.now() } }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            });
        }
    )
};