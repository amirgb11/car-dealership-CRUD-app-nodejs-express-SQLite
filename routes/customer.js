var express = require('express');
var Customer = require('../models').Customers;
var router = express.Router();

// mssndleware
var checkSSNInput = function (req, res, next) {  
    if(isNaN(req.params.ssn)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkSSNExit = function (req, res, next) {  
    //console.log('Check ID exist');
    Customer.count({ where: { ssn: req.params.ssn } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Customer not found');
        }
    }); 
};

router.get('/', function(req, res){
    Customer.findAll().then(customer => {
        res.status(200).json(customer);
    });
});

router.post('/', function(req, res){
    Customer.create({
        customer_number: req.body.customer_number,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        ssn: req.body.ssn,
        phone_number: req.body.phone_number,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        postal_code : req.body.postal_code
    }).then(customer => {
        res.status(200).json(customer);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:ssn', [checkSSNInput, checkSSNExit], function(req, res){
    Customer.findById(req.params.ssn).then(customer => {

        res.status(200).json(customer);
    });
});

router.put('/:ssn', [checkSSNInput, checkSSNExit], function(req, res){
    Customer.update({
        customer_number: req.body.customer_number,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        ssn: req.body.ssn,
        phone_number: req.body.phone_number,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        postal_code : req.body.postal_code
    },{
        where: { ssn: req.params.ssn }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:ssn', [checkSSNInput, checkSSNExit], function(req, res){
    Customer.destroy({
        where: { ssn: req.params.ssn }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;