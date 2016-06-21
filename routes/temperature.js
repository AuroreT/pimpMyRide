var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('get temperature');
});

router.post('/', function(req, res) {
  res.send('post temperature');
});

router.put('/', function(req, res) {
  res.send('put temperature');
});

module.exports = router;
