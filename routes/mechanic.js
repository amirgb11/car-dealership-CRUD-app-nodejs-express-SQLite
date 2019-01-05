var express = require('express');
var Mechanic = require('../models').Mechanic;
var router = express.Router();

// mssndleware
var checkSSNInput = function (req, res, next) {  
    if(isNaN(req.params.ssn)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkSSNExist = function (req, res, next) {  
    //console.log('Check ID exist');
    Mechanic.count({ where: { ssn: req.params.ssn } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Mechanic not found');
        }
    }); 
};

router.get('/', function(req, res){
    Mechanic.findAll().then(mechanic => {
        res.status(200).json(mechanic);
    });
});

router.post('/', function(req, res){
    Mechanic.create({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }).then(mechanic => {
        res.status(200).json(mechanic);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:ssn', [checkSSNInput, checkSSNExist], function(req, res){
    Mechanic.findById(req.params.ssn).then(mechanic => {

        res.status(200).json(mechanic);
    });
});

router.put('/:ssn', [checkSSNInput, checkSSNExist], function(req, res){
    Mechanic.update({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    },{
        where: { ssn: req.params.ssn }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:ssn', [checkSSNInput, checkSSNExist], function(req, res){
    Mechanic.destroy({
        where: { ssn: req.params.ssn }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;