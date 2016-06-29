'use strict';
var mongoose = require('mongoose');
var mongolabStringConnexion = process.env.MONGODB_URI;

mongoose.connect(mongolabStringConnexion);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connexion establish to ' + mongolabStringConnexion);
});