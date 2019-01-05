var express = require('express');
var Parts = require('../models').Parts;
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
    Parts.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Parts not found');
        }
    }); 
};

router.get('/', function(req, res){
    Parts.findAll().then(parts => {
        res.status(200).json(parts);
    });
});

router.post('/', function(req, res){
    Parts.create({
        invoice_number : req.body.invoice_number,
        invoice_date : req.body.invoice_date
    }).then(parts => {
        res.status(200).json(parts);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Parts.findById(req.params.id).then(parts => {

        res.status(200).json(parts);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    Parts.update({
        invoice_number : req.body.invoice_number,
        invoice_date : req.body.invoice_date
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    Parts.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;