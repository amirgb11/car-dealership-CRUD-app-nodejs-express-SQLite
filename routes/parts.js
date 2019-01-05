var express = require('express');
var Parts = require('../models').Parts;
var router = express.Router();

// mpart_numberdleware
var checkPNInput = function (req, res, next) {  
    if(isNaN(req.params.part_number)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkPNExist = function (req, res, next) {  
    //console.log('Check ID exist');
    Parts.count({ where: { part_number: req.params.part_number } }).then(count => {
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
        part_number : req.body.part_number,
        description : req.body.description,
        purchase_price : req.body.purchase_price,
        retail_price : req.body.retail_price,
    }).then(parts => {
        res.status(200).json(parts);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:part_number', [checkPNInput, checkPNExist], function(req, res){
    Parts.findById(req.params.part_number).then(parts => {

        res.status(200).json(parts);
    });
});

router.put('/:part_number', [checkPNInput, checkPNExist], function(req, res){
    Parts.update({
        part_number : req.body.part_number,
        description : req.body.description,
        purchase_price : req.body.purchase_price,
        retail_price : req.body.retail_price,
    },{
        where: { part_number: req.params.part_number }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:part_number', [checkPNInput, checkPNExist], function(req, res){
    Parts.destroy({
        where: { part_number: req.params.part_number }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;