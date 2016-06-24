var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {


  if (req.accepts('application/json')) {
    res.status(200).send({'position': [
        {
            'lat': 40.0000,
            'lng': 40.0000
        }
    ]});
  }
});

router.post('/', function(req, res) {
  res.send('post position');
});

router.put('/', function(req, res) {
  res.send('put position');
});

module.exports = router;
