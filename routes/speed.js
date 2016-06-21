var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('get speed');
});

router.post('/', function(req, res) {
  res.send('post speed');
});

router.put('/', function(req, res) {
  res.send('put speed');
});

module.exports = router;
