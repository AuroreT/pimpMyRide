var _ = require('lodash');
var express = require('express');
var router = express.Router();
var ScooterService = require('../services/scooters');
var UserService = require('../services/users');

/* GET scooters listing. */
router.get('/', function(req, res) {
    if (req.accepts('application/json')) {
        //console.log(req.user._id);
        ScooterService.findWhereIdIn(req.user.scooters)
            .then(function(scooters){
                res.status(200).send({'scooters': scooters});
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }
});

var bodyVerificator = function(req, res, next) {
    var attributes = _.keys(req.body);
    var mandatoryAttributes = ['name'];
    var missingAttributes = _.difference(mandatoryAttributes, attributes);
    if (missingAttributes.length) {
        res.status(400).send({err: missingAttributes.toString() + ' are mandatory'});
    }
    else {
        if (req.body.name) {
            next();
        }
        else {
            var error = mandatoryAttributes.toString() + ' are mandatory';
            res.status(400).send({err: error});
        }
    }
};

router.post('/', bodyVerificator, function(req, res) {

    if (req.accepts('application/json')) {
        ScooterService.findOneByQuery({name: req.body.name})
            .then(function(scooter) {
                if (scooter) {
                    res.send(409, {err: 'Existing scooter'});
                    return;
                } else {
                    req.body.owner_id = req.user._id;
                    ScooterService.createScooter(req.body)
                        .then(function(scooter) {
                            UserService.addScooterToUser(req.body.owner_id, scooter.id)
                                .catch(function (err) {
                                    res.status(500).send(err);
                                    return;
                                });
                            res.status(200).send(scooter);
                            return;
                        })
                        .catch(function (err) {
                            res.status(500).send(err);
                        });
                }
            })
            .catch(function (err) {
                res.status(500).send(err);
            });
    } else {
        res.send(406, {err: 'Not valid type for asked ressource'});
        return;
    }
});

router.get('/:id', function(req, res) {
    ScooterService.findOneByQuery({_id: req.params.id})
        .then(function (scooter) {
            if (!scooter) {
                res.status(404).send({err: 'No scooter found with id '.req.params.id});
            } else if (req.accepts('application/json'))
            {
                res.status(200).send({scooter: scooter});
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
    ;

});

router.put('/:id', function(req, res) {
    ScooterService.updateScooterById(req.params.id, req.body)
        .then(function (scooter) {
            if (!scooter) {
                res.status(404).send({err: 'No scooter found with id' + req.params.id});
                return;
            }
            if (req.accepts('application/json')) {
                res.status(200).send(scooter);
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
    ;
});

router.delete('/:id', function(req, res) {
    ScooterService.findOneByQuery({_id: req.params.id})
        .then(function (scooter){
            if(scooter)
            {
                UserService.deleteScooterToUser(scooter.owner_id, req.params.id)
                    .then(function() {
                        ScooterService.delete({_id: req.params.id})
                            .then(function() {
                                res.status(204).send();
                            })
                            .catch(function(err) {
                                res.status(500).send(err);
                            })
                        ;
                    })
                    .catch(function(err) {
                        res.status(500).send(err);
                    });
            } else {
                res.status(404).send({err: 'No scooter found with id' + req.params.id});
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

module.exports = router;
