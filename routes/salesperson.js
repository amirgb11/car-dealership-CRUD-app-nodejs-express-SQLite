var express = require('express');
var SalesPerson = require('../models').SalesPerson;
var router = express.Router();

// middleware
var checkSSNInput = function (req, res, next) {  
    if(isNaN(req.params.ssn)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkSSNExist = function (req, res, next) {  
    //console.log('Check ID exist');
    SalesPerson.count({ where: { ssn: req.params.ssn } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('SalesPerson not found');
        }
    }); 
};

router.get('/', function(req, res){
    SalesPerson.findAll().then(salesperson => {
        res.status(200).json(salesperson);
    });
});

router.post('/', function(req, res){
    SalesPerson.create({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }).then(salesperson => {
        res.status(200).json(salesperson);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:ssn', [checkSSNInput, checkSSNExist], function(req, res){
    SalesPerson.findById(req.params.ssn).then(salesperson => {

        res.status(200).json(salesperson);
    });
});

router.put('/:ssn', [checkSSNInput, checkSSNExist], function(req, res){
    SalesPerson.update({
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
    SalesPerson.destroy({
        where: { ssn: req.params.ssn }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;