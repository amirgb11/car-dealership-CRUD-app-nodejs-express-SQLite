var express = require('express');
var SalesPerson = require('../models').SalesPerson;
var router = express.Router();

// middleware
var checkIDInput = function (req, res, next) {  
    if(isNaN(req.params.id)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkIDExist = function (req, res, next) {  
    //console.log('Check ID exist');
    SalesPerson.count({ where: { id: req.params.id } }).then(count => {
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

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    SalesPerson.findById(req.params.id).then(salesperson => {

        res.status(200).json(salesperson);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    SalesPerson.update({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    SalesPerson.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;