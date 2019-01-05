var express = require('express');
var Customer = require('../models').Customer;
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
    Customer.count({ where: { id: req.params.id } }).then(count => {
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

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Customer.findById(req.params.id).then(customer => {

        res.status(200).json(customer);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
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
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    Customer.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;