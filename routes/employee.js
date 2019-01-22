var express = require('express');
var Employee = require('../models').Employees;
var router = express.Router();

// middleware
var checkSSNInput = function (req, res, next) {  
    if(isNaN(req.params.ssn)) {
        res.status(400).json('Invalid SSN supplied');
    } else {
        next();
    }
};
var checkSSNExist = function (req, res, next) {  
    //console.log('Check ID exist');
    Employee.count({ where: { ssn: req.params.ssn } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Employee not found');
        }
    }); 
};

router.get('/', function(req, res){
    Employee.findAll().then(employee => {
        res.status(200).json(employee);
    });
});

router.post('/', function(req, res){
    Employee.create({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }).then(employee => {
        res.status(200).json(employee);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:ssn', [checkSSNInput, checkSSNExist], function(req, res){
    Employee.findById(req.params.ssn).then(employee => {

        res.status(200).json(employee);
    });
});

router.put('/:ssn', [checkSSNInput, checkSSNExist], function(req, res){
    Employee.update({
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
    Employee.destroy({
        where: { ssn: req.params.ssn }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;