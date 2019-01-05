var express = require('express');
var CarWithOwner = require('../models').CarWithOwner;
var router = express.Router();

// mVINdleware
var checkVINInput = function (req, res, next) {  
    if(isNaN(req.params.VIN)) {
        res.status(400).json('InvalVIN ID supplied');
    } else {
        next();
    }
};
var checkVINExist = function (req, res, next) {  
    //console.log('Check ID exist');
    CarWithOwner.count({ where: { VIN: req.params.VIN } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('CarWithOwner not found');
        }
    }); 
};

router.get('/', function(req, res){
    CarWithOwner.findAll().then(carwithowner => {
        res.status(200).json(carwithowner);
    });
});

router.post('/', function(req, res){
    CarWithOwner.create({
        VIN: req.body.VIN,
        model: req.body.model,
        company: req.body.company,
        color: req.body.color
    }).then(carwithowner => {
        res.status(200).json(carwithowner);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:VIN', [checkVINInput, checkVINExist], function(req, res){
    CarWithOwner.findById(req.params.VIN).then(carwithowner => {

        res.status(200).json(carwithowner);
    });
});

router.put('/:VIN', [checkVINInput, checkVINExist], function(req, res){
    CarWithOwner.update({
        VIN: req.body.VIN,
        model: req.body.model,
        company: req.body.company,
        color: req.body.color,
    },{
        where: { VIN: req.params.VIN }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:VIN', [checkVINInput, checkVINExist], function(req, res){
    CarWithOwner.destroy({
        where: { VIN: req.params.VIN }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;