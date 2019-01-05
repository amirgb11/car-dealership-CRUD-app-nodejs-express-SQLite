var express = require('express');
var Car = require('../models').Car;
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
    Car.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Car not found');
        }
    }); 
};

router.get('/', function(req, res){
    Car.findAll().then(car => {
        res.status(200).json(car);
    });
});

router.post('/', function(req, res){
    Car.create({
        VIN: req.body.VIN,
        model: req.body.model,
        company: req.body.company,
        color: req.body.color
        //Client_ssn: req.body.Client_ssn
    }).then(car => {
        res.status(200).json(car);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Car.findById(req.params.id).then(car => {

        res.status(200).json(car);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    Car.update({
        VIN: req.body.VIN,
        model: req.body.model,
        company: req.body.company,
        color: req.body.color,
        //Client_ssn: req.body.Client_ssn
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    Car.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;