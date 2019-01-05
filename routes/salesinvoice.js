var express = require('express');
var SalesInvoice = require('../models').SalesInvoice;
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
    SalesInvoice.count({ where: { id: req.params.id } }).then(count => {
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

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    SalesInvoice.findById(req.params.id).then(salesinvoice => {

        res.status(200).json(salesinvoice);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    SalesInvoice.update({
        invoice_number : req.body.invoice_number,
        invoice_date : req.body.invoice_date
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    SalesInvoice.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;