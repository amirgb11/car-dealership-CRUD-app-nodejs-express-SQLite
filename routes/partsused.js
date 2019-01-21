var express = require('express');
var PartsUseds = require('../models').PartsUseds;
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
    PartsUseds.count({ where: { part_number: req.params.part_number } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('PartsUsed not found');
        }
    }); 
};

router.get('/', function(req, res){
    PartsUseds.findAll().then(partsused => {
        res.status(200).json(partsused);
    });
});

router.post('/', function(req, res){
    PartsUseds.create({
        part_number : req.body.part_number,
        ticket_number : req.body.ticket_number,
        number_used : req.body.number_used,
        price : req.body.price,
    }).then(partsused => {
        res.status(200).json(partsused);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:part_number', [checkPNInput, checkPNExist], function(req, res){
    PartsUseds.findById(req.params.part_number).then(partsused => {

        res.status(200).json(partsused);
    });
});

router.put('/:part_number', [checkPNInput, checkPNExist], function(req, res){
    PartsUseds.update({
        part_number : req.body.part_number,
        ticket_number : req.body.ticket_number,
        number_used : req.body.number_used,
        price : req.body.price,
    },{
        where: { part_number: req.params.part_number }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:part_number', [checkPNInput, checkPNExist], function(req, res){
    PartsUseds.destroy({
        where: { part_number: req.params.part_number }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;