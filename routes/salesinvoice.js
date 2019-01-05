var express = require('express');
var SalesInvoice = require('../models').SalesInvoice;
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
    SalesInvoice.count({ where: { invoice_number: req.params.invoice_number } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('SalesInvoice not found');
        }
    }); 
};

router.get('/', function(req, res){
    SalesInvoice.findAll().then(salesinvoice => {
        res.status(200).json(salesinvoice);
    });
});

router.post('/', function(req, res){
    SalesInvoice.create({
        invoice_number : req.body.invoice_number,
        invoice_date : req.body.invoice_date
    }).then(salesinvoice => {
        res.status(200).json(salesinvoice);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:invoice_number', [checkINInput, checkINExist], function(req, res){
    SalesInvoice.findById(req.params.invoice_number).then(salesinvoice => {

        res.status(200).json(salesinvoice);
    });
});

router.put('/:invoice_number', [checkINInput, checkINExist], function(req, res){
    SalesInvoice.update({
        invoice_number : req.body.invoice_number,
        invoice_date : req.body.invoice_date
    },{
        where: { invoice_number: req.params.invoice_number }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:invoice_number', [checkINInput, checkINExist], function(req, res){
    SalesInvoice.destroy({
        where: { invoice_number: req.params.invoice_number }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;