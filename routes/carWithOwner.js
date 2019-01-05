var express = require('express');
var CarWithOwner = require('../models').CarWithOwner;
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
    CarWithOwner.count({ where: { id: req.params.id } }).then(count => {
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

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    CarWithOwner.findById(req.params.id).then(carwithowner => {

        res.status(200).json(carwithowner);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    CarWithOwner.update({
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
    CarWithOwner.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;