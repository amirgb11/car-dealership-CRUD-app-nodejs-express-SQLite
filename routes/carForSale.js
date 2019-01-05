var express = require('express');
var CarForSale = require('../models').CarForSale;
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
    CarForSale.count({ where: { id: req.params.id } }).then(count => {
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

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    CarForSale.findById(req.params.id).then(carforsale => {

        res.status(200).json(carforsale);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    CarForSale.update({
        VIN: req.body.VIN,
        model: req.body.model,
        company: req.body.company,
        color: req.body.color,
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    CarForSale.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;