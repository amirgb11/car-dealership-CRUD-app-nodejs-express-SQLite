var express = require('express');
var SoldBy = require('../models').SoldBies;
var router = express.Router();

// middleware
var checkINInput = function (req, res, next) {  
    if(isNaN(req.params.invoice_number)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkINExist = function (req, res, next) {  
    //console.log('Check invoice_number exist');
    SoldBy.count({ where: { invoice_number: req.params.invoice_number } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('SoldBy not found');
        }
    }); 
};

router.get('/', function(req, res){
    SoldBy.findAll().then(soldby => {
        res.status(200).json(soldby);
    });
});

router.post('/', function(req, res){
    SoldBy.create({
        invoice_number : req.body.invoice_number,
        ssn : req.body.ssn
    }).then(soldby => {
        res.status(200).json(soldby);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:invoice_number', [checkINInput, checkINExist], function(req, res){
    SoldBy.findById(req.params.invoice_number).then(soldby => {

        res.status(200).json(soldby);
    });
});

router.put('/:invoice_number', [checkINInput, checkINExist], function(req, res){
    SoldBy.update({
        invoice_number : req.body.invoice_number,
        ssn : req.body.ssn
    },{
        where: { invoice_number: req.params.invoice_number }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:invoice_number', [checkINInput, checkINExist], function(req, res){
    SoldBy.destroy({
        where: { invoice_number: req.params.invoice_number }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;