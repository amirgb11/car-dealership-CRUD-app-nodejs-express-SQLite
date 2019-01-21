var express = require('express');
var ServiceMechanic = require('../models').ServiceMechanics;
var router = express.Router();

// middleware
var checkSIDInput = function (req, res, next) {  
    if(isNaN(req.params.service_id)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkSIDExist = function (req, res, next) {  
    //console.log('Check ID exist');
    ServiceMechanic.count({ where: { service_id: req.params.service_id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('ServiceMechanic not found');
        }
    }); 
};

router.get('/', function(req, res){
    ServiceMechanic.findAll().then(servicemechanic => {
        res.status(200).json(servicemechanic);
    });
});

router.post('/', function(req, res){
    ServiceMechanic.create({
        service_id : req.body.service_id,
        ssn : req.body.ssn,
        hours : req.body.hours,
        comment : req.body.comment,
        rate : req.body.rate

    }).then(servicemechanic => {
        res.status(200).json(servicemechanic);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:service_id', [checkSIDInput, checkSIDExist], function(req, res){
    ServiceMechanic.findById(req.params.service_id).then(servicemechanic => {

        res.status(200).json(servicemechanic);
    });
});

router.put('/:service_id', [checkSIDInput, checkSIDExist], function(req, res){
    ServiceMechanic.update({
        service_id : req.body.service_id,
        ssn : req.body.ssn,
        hours : req.body.hours,
        comment : req.body.comment,
        rate : req.body.rate
    },{
        where: { service_id: req.params.service_id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:service_id', [checkSIDInput, checkSIDExist], function(req, res){
    ServiceMechanic.destroy({
        where: { service_id: req.params.service_id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;