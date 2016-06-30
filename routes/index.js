var express = require('express');
var router = express.Router();
var UserService = require('../services/users');

/* GET home page. */

router.get('/', function(req, res) {
    res.status(200).send({'page': 'index'});
});

module.exports = router;
