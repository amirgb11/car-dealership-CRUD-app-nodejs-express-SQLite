var express = require('express');
var CarForSale = require('../models').CarForSales;
var router = express.Router();

// middleware
var checkVINInput = function (req, res, next) {  
    if(isNaN(req.params.VIN)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkVINExist = function (req, res, next) {  
    //console.log('Check ID exist');
    CarForSale.count({ where: { VIN: req.params.VIN } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('CarForSale not found');
        }
    }); 
};

router.get('/', function(req, res){
    CarForSale.findAll().then(carforsale => {
        res.status(200).json(carforsale);
    });
});

router.post('/', function(req, res){
    CarForSale.create({
        VIN: req.body.VIN,
        model: req.body.model,
        company: req.body.company,
        color: req.body.color
    }).then(carforsale => {
        res.status(200).json(carforsale);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:VIN', [checkVINInput, checkVINExist], function(req, res){
    CarForSale.findById(req.params.VIN).then(carforsale => {

        res.status(200).json(carforsale);
    });
});

router.put('/:VIN', [checkVINInput, checkVINExist], function(req, res){
    CarForSale.update({
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
    CarForSale.destroy({
        where: { VIN: req.params.VIN }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;