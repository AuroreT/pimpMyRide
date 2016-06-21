var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('get position');
});

router.post('/', function(req, res) {
  res.send('post position');
});

router.put('/', function(req, res) {
  res.send('put position');
});

module.exports = router;
